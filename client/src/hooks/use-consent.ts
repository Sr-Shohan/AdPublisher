import { useState, useEffect } from 'react';
import { CONSENT_STRINGS } from '@shared/schema';

type ConsentType = 'acceptedAll' | 'acceptedNecessary' | 'declined' | null;

export function useConsent() {
  const [consent, setConsent] = useState<ConsentType>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('publisherCookieConsent') as ConsentType;
    
    if (storedConsent) {
      setConsent(storedConsent);
      if (storedConsent === 'acceptedAll') {
        runEskimiTracking(CONSENT_STRINGS.acceptedAll);
      } else if (storedConsent === 'acceptedNecessary') {
        runEskimiTracking(CONSENT_STRINGS.acceptedNecessary);
      }
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (type: ConsentType) => {
    setConsent(type);
    setIsVisible(false);
    
    if (type) {
      localStorage.setItem('publisherCookieConsent', type);
      
      if (type === 'acceptedAll') {
        runEskimiTracking(CONSENT_STRINGS.acceptedAll);
      } else if (type === 'acceptedNecessary') {
        runEskimiTracking(CONSENT_STRINGS.acceptedNecessary);
      }
    }
  };

  const resetConsent = () => {
    localStorage.removeItem('publisherCookieConsent');
    setConsent(null);
    setIsVisible(true);
  };

  return { consent, isVisible, handleConsent, resetConsent };
}

// Logic extracted from original HTML
function runEskimiTracking(consentString: string) {
  // @ts-ignore - legacy script injection
  !function(f,e,t,u,n,s,p){if(f.esk)return;n=f.esk=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f.___esk)f.___esk=n;n.push=n;n.loaded=!0;n.queue=[];s=e.createElement(t);s.async=!0;s.src=u;p=e.getElementsByTagName(t)[0];p.parentNode.insertBefore(s,p)}(window,document,'script','https://dsp-media.eskimi.com/assets/js/e/gtr.min.js?_=0.0.0.6');
  
  // @ts-ignore
  if (window.esk) {
    // @ts-ignore
    window.esk('bid');
    // @ts-ignore
    window.esk('consent', consentString);
  }
}
