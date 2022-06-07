# use the `mongo` image
# copy the app directory and any files needed for your implementation from your local to the container
# equip it with all the packages and installs needed to run the flask app (packages are defined in app/requirements.txt. `pip install -r app/requirements.txt`)
# expose the port flask app will run on

FROM python
COPY app .
#RUN ["/usr/bin/sudo", "ap/usr/bin/apt-get", "install", "python3-pip"]
#RUN ["/usr/bin/apt-get", "install", "python3-pip"]
RUN apt-get update && apt-get install -y python3-pip

RUN ["/usr/bin/python3", "-m", "pip", "install", "-r", "requirements.txt"]
CMD ["/usr/bin/python3", "app.py"]