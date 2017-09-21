import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# AWS Config
EMAIL_HOST = 'smtp.mandrillapp.com'
EMAIL_HOST_USER = 'gurpreet@browntape.com'

#Production password
#EMAIL_HOST_PASSWORD = 'sf0skyQV5C2aOjUCVec3_A'

#Test password
EMAIL_HOST_PASSWORD = '7N8oXCcCxNKbRV-mYEP8ag'

EMAIL_PORT = 587


#Mailgun Config
# EMAIL_HOST = 'smtp.mailgun.org'
# EMAIL_HOST_USER = 'postmaster@sandbox983fb1103e834c5bbd9e5d3924cd4cd1.mailgun.org'
# EMAIL_HOST_PASSWORD = '0fd765c571b1e4b4b73aa3d37f96d1f6'
# EMAIL_PORT = 587

msg = MIMEMultipart('alternative')


def send(message,**kwargs):
    product_id = kwargs.get('product_id', None)

    if product_id:
        msg['Subject'] = "Failed to crawl for the product ID "+str(product_id)
    else:
        msg['Subject'] = "Crawler failed for the batch"

    msg['From'] = "repricer@browntape.com"
    recipients = ["robiul@ajency.in","ashika@ajency.in"]
    msg['To'] = ", ".join(recipients)

    html = message
    mime_text = MIMEText(html, 'html')
    msg.attach(mime_text)
    s = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
    s.starttls()
    s.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
    s.sendmail(msg['From'], recipients, msg.as_string())
    s.quit()
