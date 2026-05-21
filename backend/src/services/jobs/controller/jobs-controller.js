import { supabase } from '../../../config/supabase.js';

// ── GET /jobs ─────────────────────────────────────────────────────────────────
export async function listJobs(req, res) {
  const { search, category, limit = 20, offset = 0 } = req.query;

  let query = supabase
    .from('Job_listings')
    .select(`
      id,
      Job,
      Min_Salary,
      Max_Salary,
      created_at,
      Job_Skills (
        Skills ( id, Skill_name )
      )
    `)
    .order('created_at', { ascending: false })
    .range(Number(offset), Number(offset) + Number(limit) - 1);

  if (category) {
    query = query.eq('Job', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Jobs list error:', error);
    return res.status(500).json({ error: 'Failed to fetch job listings' });
  }

  const jobs = (data || []).map(job => ({
    id:           job.id,
    title:        job.Title,
    category:     job.Job_Category,
    min_salary:   job.Min_Salary,
    max_salary:   job.Max_Salary,
    created_at:   job.created_at,
    skills:       (job.Job_Skills || []).map(js => js.Skills).filter(Boolean),
  }));

  res.json({ jobs });
}

// ── GET /jobs/:id ─────────────────────────────────────────────────────────────
export async function getJobById(req, res) {
  const { id } = req.params;

  const { data: job, error } = await supabase
    .from('Job_listings')
    .select(`
      id,
      Job,
      Min_Salary,
      Max_Salary,
      created_at,
      Job_Skills (
        Skills ( id, Skill_name )
      )
    `)
    .eq('id', id)
    .single();

  if (error || !job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json({
    job: {
      id:         job.id,
      title:      job.Title,
      category:   job.Job_Category,
      min_salary: job.Min_Salary,
      max_salary: job.Max_Salary,
      created_at: job.created_at,
      skills:     (job.Job_Skills || []).map(js => js.Skills).filter(Boolean),
    },
  });
}

// ── GET /jobs/meta/categories ─────────────────────────────────────────────────
export async function getCategories(req, res) {
  const { data, error } = await supabase
    .from('Job_listings')
    .select('Job_Category')
    .order('Job_Category');

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }

  const categories = [...new Set((data || []).map(d => d.Job_Category).filter(Boolean))];
  res.json({ categories });
}
