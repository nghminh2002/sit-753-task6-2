import React, { useEffect } from 'react';
import { envConfig } from 'src/config';

interface GoogleSignInButtonProps {
  login: (socialToken: string) => void;
}

export function GoogleSignInButton(props: GoogleSignInButtonProps) {
  const login = props.login;
  const handleCallbackResponse = async (response: any) => {
    await login(response.credential);
  };

  useEffect(() => {
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: envConfig.googleAppId,
      callback: handleCallbackResponse,
      scope: 'email',
      ux_mode: 'popup',
    });

    // @ts-ignore
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
      logo_alignment: 'center',
    });
  }, [login]);
  return <div id="signInDiv" />;
}
