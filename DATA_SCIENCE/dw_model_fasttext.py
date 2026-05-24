import urllib.request

url = "https://dl.fbaipublicfiles.com/fasttext/supervised-models/lid.176.bin"

urllib.request.urlretrieve(url, "lid.176.bin")

print("Download selesai")