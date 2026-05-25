import pandas as pd
import fasttext

# load model fasttext
model = fasttext.load_model("lid.176.bin")

# baca csv
df = pd.read_csv("full_dataset_glints_v2.csv")

# ambil semua skills
all_skills = []

for row in df['Skills'].dropna():
    skills = [s.strip() for s in row.split(',')]
    all_skills.extend(skills)

# hilangkan duplikat
unique_skills = sorted(set(all_skills))

# fungsi deteksi bahasa
def detect_language(text):
    prediction = model.predict(text)

    # hasil contoh:
    # ('__label__en', array([0.98]))
    lang = prediction[0][0].replace('__label__', '')
    score = prediction[1][0]

    return lang, score

# proses deteksi
results = []

for skill in unique_skills:
    lang, confidence = detect_language(skill)

    results.append({
        'Skill': skill,
        'Language': lang,
        'Confidence': confidence
    })

# dataframe hasil
skills_df = pd.DataFrame(results)

# filter bahasa indonesia
indo_skills = skills_df[skills_df['Language'] == 'id']

# export csv
skills_df.to_csv("all_skills_detected.csv", index=False)
indo_skills.to_csv("skills_indonesia.csv", index=False)

print("Jumlah semua skill:", len(skills_df))
print("Jumlah skill Indonesia:", len(indo_skills))

print("\nSkill Bahasa Indonesia:")
print(indo_skills)