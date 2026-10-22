# Contact Form (Name, Email, Message)

A frontend-only contact form. Submissions are emailed to **hedkeytaining@gmail.com** using
[FormSubmit](https://formsubmit.co) — no backend or server code required.

## Files

| File         | Purpose                                      |
|--------------|----------------------------------------------|
| `index.html` | Form markup                                  |
| `style.css`  | Styling                                      |
| `script.js`  | Validation + sends the data to the admin email |

## One-time activation (required)

FormSubmit must confirm that you own the destination inbox before it delivers mail.

1. Host the folder on any website (or run it locally with a simple server, e.g. `npx serve` or VS Code Live Server).
   Opening `index.html` directly via `file://` will not work with FormSubmit.
2. Submit the form once.
3. Open the inbox of **hedkeytaining@gmail.com** — you'll receive an
   "Activate Form" email from FormSubmit (check Spam too).
4. Click the activation button. From now on every submission arrives in that inbox.

## Hide the admin email from the page source (optional)

After activation, FormSubmit gives you a random alias URL like
`https://formsubmit.co/el/xxxxxx`. In `script.js`, change:

```js
const ENDPOINT = `https://formsubmit.co/ajax/${ADMIN_EMAIL}`;
```

to:

```js
const ENDPOINT = "https://formsubmit.co/ajax/xxxxxx"; // your alias
```

## Changing the admin email

Edit `ADMIN_EMAIL` at the top of `script.js`. The new address needs to be activated the same way.

## Features

- Client-side validation (name, email format, message length)
- Loading state and success / error messages
- Honeypot field to reduce spam
- Responsive design
