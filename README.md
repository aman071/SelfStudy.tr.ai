# SelfStudy.tr.ai
Flexibility. Customizability. Learn your own way.

Make notes about what you have learnt, and get them delivered to your inbox, the way you want. 
A quiz? A summary? A hard test? 
You say it.

Summary: You enter your notes into the web app. While submitting, you decide on a frequency for how often you want to receive the emails associated to this particular set of notes. Based on your chosen frequency and behavior, emails are sent to your email address.

NOTE: Under development.
# ------------------------------------------

![](images/1_text_on_frontend.png)

First, the user writes their notes on the web app. The text editor is imported as a component, TipTap has been used.
Some basic features like trimming extra spaces between words, from the beginning and end, copying text are added.
More to be added.

Then the user clicks submit. Which prompts the user to send the notes and an associated quiz to their email or Evernote.

Currently only sending to email is functional.

![](images/2_received_on_postman.png)

Testing the API endpoint through Postman. The same body is sent through Postman.

![](images/3_generated_quiz.png)

The notes which are received to the backend, are sent to Google's PaLM 2 API. The context provided states the AI to act as a quiz generator.

To be added: Behavior of AI according to user prompt.

![](images/4a_mail_html_preview.png)

![](images/4b_mail_text_preview.png)

Preview-mailer package for NodeJS is used to look at a preview of how the email will look when it is sent.

![](images/5_sending_to_my_email.png)

The email to which the content is to be sent is entered. When **Send to my email** is clicked, it takes a few seconds for the input to go to PaLM 2 API and for the result to be generated. Once the email is sent, the email section and buttons will be hidden. 

![](images/6b_receving_quiz_email.png)

Showing that generated quiz email has been received.

![](images/6a_receving_my_email.png)

We can also send the notes to our user.