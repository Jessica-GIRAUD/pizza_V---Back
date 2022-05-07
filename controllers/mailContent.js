const MailContent = (token) => {
  return `<div style="background-color:#f6f6f6; width:100%; height:100vh;" >
            <div style="background-color:#ffffff; width:90%; margin: 20px auto;">
              <p style="padding-top: 20px; color: black;">Bonjour,</p>
              <p>
                Vous avez oublié votre mot de passe pour accéder à votre espace
                administrateur Pizza Kika.
              </p>
              <p>
                Pour définir un nouveau mot de passe, il vous suffit de cliquer sur le
                lien ci-dessous :
              </p>

              <a
                href="pizza-kika.netlify.app/admin/resetpassword/${token}"
                style="display: flex;
                    width: fit-content;
                    margin: 30px auto;
                    font-size: inherit;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    background-color: rgba(0, 0, 0, 0.486);
                    font-weight: bold;"
              >
                Je choisis un nouveau mot de passe
              </a>
    
              <p>
                Ce lien expirera dans 15 minutes, utilisez-le dès que possible. Passé ce
                délai, il faudra faire une nouvelle demande de mot de passe.
              </p>
              <p>À tout de suite ! </p>
              <p>Votre adminitratrice </p>
            <div>
          </div> `;
};

module.exports = MailContent;
