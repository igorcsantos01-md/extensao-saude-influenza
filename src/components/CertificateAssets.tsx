import React from 'react';

export const LogoEditoraMenteSaude: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Logotipo Editora Mente e Saúde"
  >
    {/* Rounded outer frame with soft mint translucent tint and deep green stroke */}
    <rect
      x="6"
      y="6"
      width="108"
      height="108"
      rx="16"
      fill="#E6F4EA"
      fillOpacity="0.55"
      stroke="#0F4C3A"
      strokeWidth="2.8"
    />
    <rect
      x="11"
      y="11"
      width="98"
      height="98"
      rx="12"
      stroke="#0F4C3A"
      strokeWidth="1"
      strokeOpacity="0.45"
    />

    {/* Curved top arc path for text */}
    <path
      id="ems-arc"
      d="M 20,58 A 40,40 0 1,1 100,58"
      fill="none"
      stroke="none"
    />
    <text
      fill="#0F4C3A"
      fontSize="7.5"
      fontWeight="700"
      letterSpacing="0.6"
      fontFamily="Plus Jakarta Sans, Arial, sans-serif"
    >
      <textPath href="#ems-arc" startOffset="50%" textAnchor="middle">
        EDITORA MENTE E SAÚDE
      </textPath>
    </text>

    {/* Stylized Human Head Profile & Open Book Pedestal */}
    <path
      d="M36 96 H84 M42 91 H78"
      stroke="#0F4C3A"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    {/* Open Book Base */}
    <path
      d="M38 90 C46 87, 54 88, 60 91 C66 88, 74 87, 82 90 L80 82 C73 80, 65 81, 60 84 C55 81, 47 80, 40 82 Z"
      fill="#0F4C3A"
      fillOpacity="0.15"
      stroke="#0F4C3A"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Head Silhouette */}
    <path
      d="M48 82 V74 C42 72, 39 66, 39 59 C39 46, 48 37, 61 37 C72 37, 80 45, 80 55 C80 58, 83 61, 84 63 C85 64, 83 66, 81 66 L80 71 C80 75, 76 77, 72 77 H68 V82"
      stroke="#0F4C3A"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Brain Gyri & Botanical Leaf Motif inside the Mind */}
    <path
      d="M48 54 C48 47, 54 43, 61 43 C68 43, 73 48, 73 54 C73 60, 68 64, 60 64 C53 64, 48 60, 48 54 Z"
      fill="#15803D"
      fillOpacity="0.18"
      stroke="#0F4C3A"
      strokeWidth="2"
    />
    <path
      d="M54 51 C57 48, 63 48, 66 51 M53 56 C57 59, 64 59, 67 55 M60 43 V64"
      stroke="#0F4C3A"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Sprouting Botanical Leaves above Brain */}
    <path
      d="M60 42 C60 35, 67 31, 72 33 C70 38, 65 42, 60 42 Z"
      fill="#15803D"
      stroke="#0F4C3A"
      strokeWidth="1.6"
    />
    <path
      d="M60 42 C60 36, 53 32, 49 34 C51 39, 55 42, 60 42 Z"
      fill="#22C55E"
      stroke="#0F4C3A"
      strokeWidth="1.6"
    />
  </svg>
);

export const LogoCentroMariaDalva: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Logotipo Centro Profissionalizante Maria Dalva de Araújo"
  >
    {/* Deep Navy Circular Emblem - 100% transparent exterior, no corner brackets, no phone numbers */}
    <circle cx="60" cy="60" r="54" fill="#1B365D" />
    <circle
      cx="60"
      cy="60"
      r="49"
      stroke="#93C5FD"
      strokeWidth="1.4"
      strokeOpacity="0.65"
    />
    <circle
      cx="60"
      cy="60"
      r="36"
      fill="#0F294A"
      stroke="#60A5FA"
      strokeWidth="1.2"
      strokeOpacity="0.5"
    />

    {/* Top & Bottom Circular Paths for Institution Name */}
    <path
      id="cmda-top-arc"
      d="M 17,60 A 43,43 0 1,1 103,60"
      fill="none"
    />
    <path
      id="cmda-bot-arc"
      d="M 103,60 A 43,43 0 1,1 17,60"
      fill="none"
    />
    <text
      fill="#F8FAFC"
      fontSize="6.5"
      fontWeight="700"
      letterSpacing="0.7"
      fontFamily="Plus Jakarta Sans, Arial, sans-serif"
    >
      <textPath href="#cmda-top-arc" startOffset="50%" textAnchor="middle">
        CENTRO PROFISSIONALIZANTE
      </textPath>
    </text>
    <text
      fill="#BAE6FD"
      fontSize="6.3"
      fontWeight="700"
      letterSpacing="0.65"
      fontFamily="Plus Jakarta Sans, Arial, sans-serif"
    >
      <textPath href="#cmda-bot-arc" startOffset="50%" textAnchor="middle">
        MARIA DALVA DE ARAÚJO
      </textPath>
    </text>

    {/* Lightbulb Rays */}
    <path
      d="M60 28 V33 M42 35 L46 39 M78 35 L74 39 M35 52 H40 M85 52 H80"
      stroke="#FDE047"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Knowledge Lightbulb with Puzzle Division */}
    <path
      d="M47 54 C47 46.268 52.82 40 60 40 C67.18 40 73 46.268 73 54 C73 59.2 69.8 63.4 66.5 66.5 L65.5 72 H54.5 L53.5 66.5 C50.2 63.4 47 59.2 47 54 Z"
      fill="#38BDF8"
      fillOpacity="0.22"
      stroke="#F8FAFC"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Puzzle Interlock Lines inside Bulb */}
    <path
      d="M60 40 V51 C62.5 51 63.5 53 62 54.5 C60.5 56 60 57 60 66 M48 55 H56 C56 52.5 58.5 52.5 59 55 H72"
      stroke="#BAE6FD"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Bulb Base Threads */}
    <path
      d="M55 75 H65 M56.5 78.5 H63.5 M58 82 H62"
      stroke="#FDE047"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const SignatureBarbara: React.FC<{ className?: string }> = ({
  className = 'h-12 w-auto',
}) => (
  <svg
    viewBox="0 0 280 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Assinatura de Bárbara Lima dos Santos"
  >
    {/* Clean transparent calligraphic stroke matching PDF 02 & 05 */}
    <path
      d="M34 18 C32 31, 28 48, 26 55 C25 44, 33 15, 48 15 C59 15, 63 23, 52 31 C45 36, 36 37, 45 37 C59 37, 68 44, 57 52 C48 58, 32 56, 23 50"
      stroke="#141414"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M56 47 C65 46, 71 39, 75 43 C78 46, 73 50, 79 49 C85 48, 90 42, 95 46 C99 49, 105 47, 112 45 C121 43, 134 45, 145 44 C153 43, 160 26, 156 17 C152 10, 146 25, 149 39 C152 49, 161 48, 169 45 C175 42, 180 46, 186 46 C194 46, 203 44, 212 43 C219 42, 228 28, 225 18 C223 12, 219 29, 222 41 C224 48, 236 45, 252 41"
      stroke="#141414"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Accent dots & crossbar */}
    <path
      d="M74 32 L81 27 M175 33 C176 32, 177 32, 178 33 M216 30 H236"
      stroke="#141414"
      strokeWidth="2.1"
      strokeLinecap="round"
    />
  </svg>
);

export const SignatureJames: React.FC<{ className?: string }> = ({
  className = 'h-12 w-auto',
}) => (
  <svg
    viewBox="0 0 280 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Assinatura de James Araújo de Santana"
  >
    {/* Clean transparent calligraphic stroke matching PDF 02 & 05 */}
    <path
      d="M36 18 C46 13, 56 12, 54 25 C52 38, 43 56, 35 57 C29 58, 28 49, 38 45 C52 40, 72 44, 88 45 C98 46, 106 43, 116 44 C126 45, 138 45, 150 43"
      stroke="#141414"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M152 49 C157 36, 165 18, 171 17 C176 16, 178 34, 181 47 C183 52, 172 41, 160 41 C172 41, 187 44, 196 42 C203 40, 208 45, 215 44 C224 43, 233 30, 231 19 C229 12, 226 32, 230 42 C233 48, 246 44, 260 39"
      stroke="#141414"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Flourish underline */}
    <path
      d="M46 58 C98 53, 178 49, 254 45"
      stroke="#141414"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const OfficialGoldenSeal: React.FC<{
  code: string;
  className?: string;
}> = ({ code, className = 'w-24 h-24' }) => (
  <svg
    viewBox="0 0 130 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Selo Oficial de Fé Pública"
  >
    {/* Outer Gold Ring */}
    <circle
      cx="65"
      cy="65"
      r="58"
      fill="#FDF8EB"
      stroke="#C6922C"
      strokeWidth="2.8"
    />
    <circle
      cx="65"
      cy="65"
      r="52"
      fill="#FAF0D7"
      fillOpacity="0.55"
      stroke="#C6922C"
      strokeWidth="1.2"
      strokeDasharray="3 2.5"
    />
    {/* Top Stars */}
    <text
      x="65"
      y="34"
      textAnchor="middle"
      fill="#B47B18"
      fontSize="9"
      fontWeight="700"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      ★ ★ ★
    </text>
    {/* SELO OFICIAL */}
    <text
      x="65"
      y="51"
      textAnchor="middle"
      fill="#8C5E0A"
      fontSize="9.5"
      fontWeight="700"
      letterSpacing="0.8"
      fontFamily="Libre Baskerville, Georgia, serif"
    >
      SELO OFICIAL
    </text>
    {/* FÉ PÚBLICA */}
    <text
      x="65"
      y="67"
      textAnchor="middle"
      fill="#784D04"
      fontSize="11"
      fontWeight="700"
      letterSpacing="0.6"
      fontFamily="Libre Baskerville, Georgia, serif"
    >
      FÉ PÚBLICA
    </text>
    {/* Divider line */}
    <line
      x1="27"
      y1="75"
      x2="103"
      y2="75"
      stroke="#C6922C"
      strokeWidth="1"
    />
    {/* Code */}
    <text
      x="65"
      y="88"
      textAnchor="middle"
      fill="#8C5E0A"
      fontSize="7.4"
      fontWeight="700"
      fontFamily="JetBrains Mono, monospace"
    >
      {code}
    </text>
    {/* Bottom flourish */}
    <text
      x="65"
      y="103"
      textAnchor="middle"
      fill="#B47B18"
      fontSize="8"
      fontWeight="700"
    >
      ✦
    </text>
  </svg>
);
