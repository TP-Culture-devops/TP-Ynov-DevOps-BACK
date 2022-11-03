# ---------------------------------------------------------
# BACKEND
# ---------------------------------------------------------
docker remove media-back
docker run -v /DATA/document:./files/ --name media-back media_node

# ---------------------------------------------------------
# BDD
# ---------------------------------------------------------
docker remove media-bdd
docker run -v /DATA/bdd:/data/db -p 27017:27017 --name media-bdd mongo:5.0.13
