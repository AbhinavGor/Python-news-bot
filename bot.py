import requests, smtplib, ssl
from bs4 import BeautifulSoup
from pymongo import *
import re
import json

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

client = MongoClient("mongodb+srv://Abhinav123:Abhinav123@cluster0-i3gyz.mongodb.net/test?retryWrites=true&w=majority")

#SMTP setup
sender_email_password = input("Enter the password and press enter: \n")

sender_email = "updat.newsletter@gmail.com"
receiver_email = "abhinavgorantla0613@yahoo.com"

msg = MIMEMultipart('alternative')
msg['Subject'] = "Your news Updat for today"
msg['From'] = sender_email
msg['To'] = receiver_email

html = """\
    <html>
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <style type="text/css">
                body{
                    font-family: 'Candara', sans-serif;
                }
        </style>
    </head>
    <body>
        <h1 style="font-family: 'Candara', sans-serif;">This message was sent automatically by a python bot built by <i><a href="https://abhinavgor.netlify.app/">Abhinav Gorantla</a>.</i></h1>
        <h2 style="font-family: 'Candara', sans-serif;">Your daily news</h2>
        <h2 style="font-family: 'Candara', sans-serif;">Tech News </h2>
  """ 

s = smtplib.SMTP('smtp.gmail.com', 587)
# start TLS for security 
s.starttls() 
  
# Authentication 
s.login(sender_email, sender_email_password) 
  

db = client['headlines']

headlines = db['headlines']
keywords = ['node', 'javascript', 'web', 'development', 'covid', 'corona']

#Ycombinator hacker news scraping
page = requests.get('https://news.ycombinator.com/')

# Create a BeautifulSoup object
soup = BeautifulSoup(page.text, 'html.parser')

# News links
hacker_stories = soup.find(class_="itemlist").find_all(class_="storylink")
links = []
text = []
# print("-----------Hacker News------------")
for i in hacker_stories:
    # i = \i.find('a', attrs={'href': re.compile("^http")})
    for j in keywords:
        if(j in str(i).lower()):
            links.append(str(i))
            text.append(re.sub(r"""
                [,.;@#?!&$]+  # Accept one or more copies of punctuation
                \ *           # plus zero or more copies of a space,
                """,
                " ",          # and replace it with a single space
                i.getText(), flags=re.VERBOSE))
            html += str(i) + "<br />"

html += "<h2><a  style='color: black; font-family: 'Candara', sans-serif;' href = 'https://www.nytimes.com/section/world'>New York Times Headlines</a></h2>"

#NYT News scraping
nyt = requests.get('https://www.nytimes.com/section/world')

soup_nyt = BeautifulSoup(nyt.text, 'html.parser')
nyt_stories = soup_nyt.find(class_ = "css-18l1u7x e46isfb1").find_all(class_='css-l2vidh e4e4i5l1')

# print("-----------NYT News----------")
keywords = ['node', 'javascript', 'web', 'development', 'covid', 'corona']
for i in nyt_stories:
    i = (i.find('a', attrs={'href': re.compile("^/2020/")}))
    i = str(i).split('/', 1)[0] + "https://www.nytimes.com/"  + str(i).split('/', 1)[1]
    for j in keywords:
        if(j in str(i).lower()):
            links.append( str(i))
            text.append(re.sub(r"""
                [,.;@#?!&$]+  # Accept one or more copies of punctuation
                \ *           # plus zero or more copies of a space,
                """,
                " ",          # and replace it with a single space
                i, flags=re.VERBOSE))
            html += str(i) + "<br />"

html += "<h2><a  style='color: black; font-family: 'Candara', sans-serif;' href = 'https://www.cnet.com/news/'>CNET Headlines</a></h2>"

#CNET Scraping
cnet = requests.get('https://www.cnet.com/news/')

soup_cnet = BeautifulSoup(cnet.text, 'html.parser')
cnet_stories = soup_cnet.find_all(class_='mainStory')

for i in cnet_stories:
    i = str(i).split('/', 1)[0] + "https://www.cnet.com/"  + str(i).split('/', 1)[1]
    links.append(str(i))
    # text.append(re.sub(r"""
    #             [,.;@#?!&$]+  # Accept one or more copies of punctuation
    #             \ *           # plus zero or more copies of a space,
    #             """,
    #             " ",          # and replace it with a single space
    #             i, flags=re.VERBOSE))
    html += str(i) + "<br />"


html += """\
    <h1 style="font-family: 'Candara', sans-serif;">View code for the python bot <a href = 'https://github.com/AbhinavGor/Updat---Python-news-bot' style='color: red'> here.</a></h1>
    <h3 style="font-family: 'Candara', sans-serif;">For collaborations, <a href = "https://abhinavgor.netlify.app/#contact">Contact Me</a></h3>
    </body>
    </html>
"""


res_dict = dict(zip(text, links))
msg.attach(MIMEText(html, 'html'))
s.sendmail(sender_email, receiver_email, msg.as_string()) 
s.quit() 
headlines.insert_one(res_dict)

