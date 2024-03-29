const MailContent = (token, name) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pizza Kika</title>
  
      <style>
        body {
          background-color: #f6f6f6;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
  
        .deco {
          width: 100%;
          object-fit: cover;
        }
  
        .container {
          background-color: #ffffffe1;
          width: 70%;
        }
  
        .content {
          padding: 10px 30px;
        }
  
        .link,
        a {
          display: flex;
          width: fit-content;
          margin: 40px auto;
          font-size: inherit;
          padding: 15px;
          border-radius: 5px;
          background-color: rgba(0, 0, 0, 0.486);
          font-weight: bold;
          text-decoration: none;
          color: #ffffffe1;
        }
  
        .link:visited,
        a:visited,
        .txt {
          color: #ffffffe1;
        }
  
        .link:hover,
        a:hover {
          box-shadow: 1px 1px 4px #ff6233, -3px -1px 4px #2e5227;
        }
  
        .admin,
        .corps {
          margin-top: 30px;
        }
  
        @media only screen and (max-width: 915px) {
          .deco {
            width: 90% !important;
          }
  
          .container {
            width: 90% !important;
          }
  
          .content {
            padding: 10px !important;
          }
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <img
          src="https://i.ibb.co/LNDbD6M/Sans-titre-2.png"
          alt="part"
          class="deco"
        />
  
        <div class="content">
          <p>Bonjour ${name},</p>
          <p class="corps">
            Vous avez oublié votre mot de passe pour accéder à votre espace
            administrateur Pizza Kika.
          </p>
          <p>
            Pour définir un nouveau mot de passe, il vous suffit de cliquer sur le
            lien ci-dessous :
          </p>
  
          <a
            class="link"
            href="https://pizza-kika.netlify.app/admin/resetpassword/${token}"
          >
            <strong class="txt">Je choisis un nouveau mot de passe</strong>
          </a>
  
          <p>
            Ce lien expirera dans 15 minutes, utilisez-le dès que possible. Passé
            ce délai, il faudra faire une nouvelle demande de mot de passe.
          </p>
  
          <p>Bonne chance !</p>
  
          <p class="admin">Votre adminitratrice, Jessica</p>
        </div>
      </div>
    </body>
  </html>  
  `;
};

module.exports = MailContent;
