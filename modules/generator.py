import io
import os
import warnings
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from PIL import Image
from stability_sdk import client
import base64
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
# Remove all these when done vvvv
proxy = "http://192.168.43.1:8080"
os.environ['http_proxy'] = proxy 
os.environ['HTTP_PROXY'] = proxy
os.environ['https_proxy'] = proxy
os.environ['HTTPS_PROXY'] = proxy
# Remove all these when done ^^^^^^

error = False
os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'
os.environ['STABILITY_KEY'] = 'sk-LYTJu3AHFW9CZRwE7Sqm3d4NnnaowQz9QLIcj0pAjvnP81Ud'
seed = int(input(""))
stability_api = client.StabilityInference(
	key=os.environ['STABILITY_KEY'],
	verbose=True,
	engine="stable-diffusion-v1-5",
)
// Config
cloudinary.config(
  cloud_name = "dfky5lftj",
  api_key = "391632465152976",
  api_secret = "B7ZTPBfEwUh-DJ9Cv_8Q-831NPw",
  secure = true
)
answers = stability_api.generate(
    prompt="Naruto but in the 60s",
    seed= seed, # Make it a random number from javascript
    steps=30,
    cfg_scale=8.0,
    width=512,
    height=512,
    samples=1, # Get users opinion from javascript
)
for resp in answers:
	for  artifact in resp.artifacts:
		if artifact.finish_reason == generation.FILTER:
			warnings.warn(
				"Your request activated the API's safety filters and could not be processed."
                "Please modify the prompt and try again."
				)
			error = True
		if artifact.type == generation.ARTIFACT_IMAGE:
			img = Image.open(io.BytesIO(artifact.binary))
			if error == True:
				raise Exception("Sorry an Error has occurred")
			else:
				# Uploading from here
				# img.save(str(artifact.seed)+".png") # Test it with binary to send to javascript
   