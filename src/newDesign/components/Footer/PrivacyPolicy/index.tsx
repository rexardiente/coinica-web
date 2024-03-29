import React from "react";
import { Button, Box } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import styles from "./Privacy.module.scss";

interface Props{
    closeModal: Function;
}

const PrivacyPolicy = ({closeModal}:Props) => {
    return (
      <div>
        <div style={{textAlign:'right'}}>
          <Button
            variant="text"
            onClick={() => closeModal()}
            className={`${styles.close}`}
          >
            <Close color="secondary" />
          </Button>
        </div>
            <h1 className="center-content" >Privacy Policy</h1>
        <Box m={3} padding={3}>
          <p className={`${styles.privacy_policy}`}>
            <h2>Cookies Policy</h2>
            <h3>What are cookies?</h3>
            A cookie is a piece of information in the form of a very small
            text file that is placed on an internet user's computer.
            <br />
            <br />
            It is generated by a web page server (which is basically the
            computer that operates the website) and can be used by that server
            whenever the user visits the site. A cookie can be thought of as an
            internet user's identification card, which tells a website when the
            user has returned. Cookies can't harm your computer and don't store
            any personally identifiable information about you on any of our
            cookies.
            <br />
            <br />
            <h3>Why do we use cookies on Coinica?</h3>
            Coinica uses two types of cookies: cookies set by us, and cookies
            set by third parties (i.e., other websites or services). Coinica
            cookies enable us to keep you signed in to your account throughout
            your visit and to tailor the information displayed on the site to
            your preference.
            <br />
            <br />
            Coinica cookies enable us to keep you signed in to your account
            throught your visit and to tailor the information displayed on the
            site to your preferences.
            <br />
            <br />
            <h3>What cookies do we use on Coinica?</h3>
            Below is a list of the main cookies set by Coinica, and what
            each is used for:
            <ul>
              <li>fp stores browser's fingerprint Lifetime: forever.</li>
              <li>
                -t- stores timestamp when user firstly visited site in current
                browsing seesion. Needed for unique visits statistic. Lifetime:
              </li>
              <li>make any commercial use of the Content;</li>
              <li>
                'r' stores http referrer for current browsing session. Needed in
                order to external track traffic sources. Lifetime: browsing
                session.
              </li>
              <li>
                c stores identifier of affiliate campaign. Needed for a
                affiliate statistic. Lifetime: forever
              </li>
            </ul>
            <br />
            Cookies set by third parties for wildcard domain:
            *.Coinica.io
            <ul>
              <li>Google analytics:_ga. _gat,_gid</li>
              <li>Zendesk:_zicmid</li>
              <li>CloudFlare： _cfduid</li>
            </ul>
            <br />
            Please keep in mind that some browsers (i.e., chrome on mac) keep
            background processes running even if no tabs opened due to this
            session cookies may left set between sessions.
            <br />
            <br />
            There are also cookies set by third party scripts to their
            domains.
            <br />
            <h3>How can I manage my cookies on Coinica?</h3>
            If you wish to stop accepting cookies, you can do so through the
            Privacy Setting option in your browser.
            <br />
            <br />
            <br />
            <h3 className="center-content">Personal Data Protection Policy</h3>
            Coinica's mission is to keep your Data safe and for this matter we
            protect your data in various ways. We provide our customers with
            high security standards, such as encryption of data in motion over
            public networks, encryption of data in database, auditing standards,
            Distributed Denial of Service mitigations, and a Live Chat available
            on-site.
            <br />
            Server Protection Policy
            <br />
            <ul>
              <li>All servers have full encryption</li>
              <li>All backups have encryption;</li>
              <li>Firewalls, VPN Access</li>
              <li>Access to servers allowed only over VPN;</li>
              <li>All http/s services work over Cloudflare;</li>
              <li>Connections to nodes over VPN;</li>
              <li>SSH port fowarding tunnels;</li>
              <li>Services allowed only over VPN;</li>
              <li>Server have firewall and allowed only SSH port;</li>
              <li>Alerts on critical services.</li>
            </ul>
            <br />
            <h3>Data Breach Notification</h3>
            When Coinica will be made aware of personal data breaches we
            will notify relevant users in accordance with GDPR timeframes.
          </p>
        </Box>
      </div>
    );
};

export default PrivacyPolicy;