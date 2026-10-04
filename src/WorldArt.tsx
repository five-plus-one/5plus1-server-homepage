export function WorldArt({ creative = false }: { creative?: boolean }) {
  const trees = [
    [75, 242],
    [150, 282],
    [510, 251],
    [548, 187],
  ];
  return (
    <svg viewBox="0 0 640 360" className="world-art" aria-hidden="true">
      <rect
        className="scene-sky"
        width="640"
        height="360"
        fill={creative ? "#eadbd2" : "#d6e5de"}
      />
      <g className="scene-stars" fill="#fff4d1">
        <path d="M56 35h5v5h-5z M242 53h4v4h-4z M390 20h6v6h-6z M567 111h4v4h-4z M177 110h5v5h-5z" />
      </g>
      <circle
        className="scene-sun"
        cx="490"
        cy="77"
        r="36"
        fill={creative ? "#e8a578" : "#f5efd4"}
      />
      <path
        d="M0 199H60V159H116V185H180V139H247V179H296V151H345V180H400V126H456V169H512V145H570V187H640V360H0Z"
        fill={creative ? "#d9c4b9" : "#b4c9be"}
      />
      <path
        d="M0 264H66V226H135V246H190V210H257V238H322V211H383V244H444V207H508V231H576V214H640V360H0Z"
        fill={creative ? "#c5b6a6" : "#95b5a2"}
      />
      <path
        d="M42 293L313 152L596 296L323 439Z"
        fill={creative ? "#a7b1a0" : "#729578"}
      />
      {creative ? (
        <>
          <path d="M169 266L319 190L480 269L329 347Z" fill="#d4c6ad" />
          <path d="M248 233V139L324 99L401 138V233L325 273Z" fill="#f8efd9" />
          <path d="M325 178L401 138V233L325 273Z" fill="#cdbd9f" />
          <path d="M235 141L324 94L414 139L325 186Z" fill="#b85d45" />
          <path d="M251 137L324 61L396 135L325 174Z" fill="#cf7755" />
          <path
            d="M273 193V222L298 235V206Z M351 194V228L375 215V182Z"
            fill="#6f8e87"
          />
          <path d="M301 249V222L323 234V261Z" fill="#85705d" />
          <path
            d="M184 246V170L224 150L249 163V212L223 228V266Z M423 275V209L455 193L477 204V247L455 263V291Z"
            fill="#f4e9d1"
          />
          <path
            d="M177 171L222 122L255 161L224 178Z M414 210L453 170L485 206L455 222Z"
            fill="#cf7755"
          />
        </>
      ) : (
        <>
          <path d="M213 250L298 205L382 248L299 294Z" fill="#c8ba91" />
          <path d="M239 232V181L295 152L351 179V234L297 263Z" fill="#b78a5e" />
          <path d="M297 209L351 179V234L297 263Z" fill="#8c694c" />
          <path d="M224 183L294 114L368 179L297 217Z" fill="#5f7567" />
          <path d="M294 114L368 179L297 217Z" fill="#435e53" />
          <path
            d="M253 208V228L273 238V218Z M314 215V243L334 232V204Z"
            fill="#f3dc99"
          />
          <path
            d="M388 238L447 267L438 273L379 244Z M433 273L476 295L467 302L424 280Z"
            fill="#ac956c"
          />
          <path d="M120 292L194 258L226 276L156 312Z" fill="#769eab" />
          <path d="M156 312L226 276L241 285L171 321Z" fill="#92bac0" />
        </>
      )}
      <path
        d="M289 284L321 301L266 330L236 313Z M253 329L270 337L239 354L222 346Z"
        fill="#e0d3b2"
      />
      {trees.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M-4 -3V-44H5V2Z" fill="#84704f" />
          <path
            d="M-28 -49L0 -65L29 -49V-23L0 -7L-28 -23Z"
            fill={creative ? "#7e9278" : "#4e785c"}
          />
          <path d="M0 -36L29 -49V-23L0 -7Z" fill="#375e49" />
          <path d="M-28 -49L0 -65L29 -49L0 -34Z" fill="#8ea080" />
        </g>
      ))}
      <path
        className="scene-clouds"
        d="M72 84H112V71H152V84H182V98H72Z M318 48H350V36H375V48H401V60H318Z"
        fill="#f9f5eb"
        opacity=".65"
      />
      {creative ? (
        <g className="floating-cube">
          <path d="M406 92l20-10 20 10-20 11z" fill="#ecbe7c" />
          <path d="M406 92v22l20 11v-22z" fill="#c98658" />
          <path d="M426 103v22l20-11V92z" fill="#a86449" />
        </g>
      ) : (
        <g className="pixel-mob">
          <rect x="182" y="245" width="15" height="15" fill="#71934f" />
          <rect x="185" y="260" width="9" height="13" fill="#628343" />
          <path
            d="M184 248h4v4h-4z M191 248h4v4h-4z M188 253h4v5h-4z"
            fill="#263d2c"
          />
          <path d="M181 271h7v5h-7z M191 271h7v5h-7z" fill="#4d6c38" />
        </g>
      )}
      <g className="scene-torch">
        <path d="M368 246h4v20h-4z" fill="#876046" />
        <path className="torch-flame" d="M366 242h8v9h-8z" fill="#f6ba58" />
        <path
          className="torch-smoke"
          d="M368 234h4v4h-4z M371 226h3v3h-3z"
          fill="#e4cfab"
        />
      </g>
      <path
        d="M0 339H105V324H146V344H206V360H0Z M510 360V339H550V320H596V339H640V360Z"
        fill={creative ? "#8f9d83" : "#52765e"}
      />
    </svg>
  );
}
