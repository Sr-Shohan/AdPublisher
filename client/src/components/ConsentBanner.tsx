import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/hooks/use-consent";
import { Cookie, ShieldCheck, ShieldAlert } from "lucide-react";

export function ConsentBanner() {
  const { isVisible, handleConsent } = useConsent();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border/50 shadow-2xl rounded-2xl p-6 backdrop-blur-xl bg-card/95">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0 bg-primary/10 p-3 rounded-xl">
                <Cookie className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold text-foreground">Cookie Consent</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your experience, provide personalized content, and assist us in improving our marketing efforts. By consenting, you allow us to collect certain data to tailor your experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button 
                  onClick={() => handleConsent('acceptedAll')} 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                >
                  <ShieldCheck className="mr-2 w-4 h-4" />
                  Accept All
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => handleConsent('acceptedNecessary')}
                >
                  Accept Necessary
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleConsent('declined')}
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
