const MailContent = (token, name) => {
  return `<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pizza Kika</title>
  </head>
  <style>
    body {
      background-color: #f6f6f6;
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 0;
    }

    .deco {
      background-image: url(./part.jpg);
      background-size: cover;
      height: 250px;
      width: 70%;
      margin: 0 auto;

      padding: 30px;
    }

    .content {
      background-color: #ffffff;
      width: 70%;
      margin: auto;
      padding: 10px 30px;
    }

    .link {
      display: flex;
      width: fit-content;
      margin: 40px auto;
      font-size: inherit;
      padding: 15px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.486);
      font-weight: bold;
      text-decoration: none;
    }

    .link:visited {
      color: #ffffff;
    }

    .link:hover {
      box-shadow: 1px 1px 4px #ff6233, -3px -1px 4px #2e5227;
    }

    .admin,
    .corps {
      margin-top: 30px;
    }

  </style>
  <body>
    <div class="deco"></div>
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
        Je choisis un nouveau mot de passe
      </a>

      <p>
        Ce lien expirera dans 15 minutes, utilisez-le dès que possible. Passé ce
        délai, il faudra faire une nouvelle demande de mot de passe.
      </p>

      <p>À tout de suite !</p>

      <p class="admin">Votre adminitratrice</p>
    </div>
  </body>
</html> `;
};

module.exports = MailContent;
