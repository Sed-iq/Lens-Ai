import io
import os
import warnings
from PIL import Image
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
# Remove all these when done vvvv


error = False
seed = int(input(""))
os.environ['STABILITY_HOST'] =input()
os.environ['STABILITY_KEY'] = input()
stability_api = client.StabilityInference(
	key=os.environ['STABILITY_KEY'],
	verbose=True,
	engine="stable-diffusion-v1-5",
)

answers = stability_api.generate(
    prompt=input(),
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
				img.save(str(seed)+".png")
        
   