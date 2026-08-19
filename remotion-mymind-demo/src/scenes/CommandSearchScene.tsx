import {Easing, interpolate, useCurrentFrame} from 'remotion';

const commands = [
  {icon: '✦', label: 'Generate process flow from text', shortcut: ''},
  {icon: '◇', label: 'Add idea node', shortcut: 'N'},
  {icon: '</>', label: 'Add code block', shortcut: ''},
  {icon: '▦', label: 'Import CSV or Excel', shortcut: ''},
  {icon: 'T', label: 'Add text', shortcut: 'T'},
  {icon: '▧', label: 'Add image', shortcut: 'P'},
];

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

export const CommandSearchScene: React.FC<{mobile?: boolean}> = ({mobile = false}) => {
  const frame = useCurrentFrame();
  const phrase = 'process flow';
  const characters = Math.max(0, Math.min(phrase.length, Math.floor((frame - 28) / 2) + 1));
  const query = phrase.slice(0, characters);
  const shortcutOpacity = interpolate(frame, [0, 4, 15, 21], [0, 1, 1, 0], clamp);
  const shortcutScale = interpolate(frame, [0, 7, 15, 21], [.84, 1, 1, .94], {
    ...clamp,
    easing: Easing.bezier(.16, 1, .3, 1),
  });
  const keyPress = interpolate(frame, [9, 12, 15], [0, 1, 0], clamp);
  const paletteOpacity = interpolate(frame, [17, 26, 68, 81], [0, 1, 1, 0], clamp);
  const paletteScale = interpolate(frame, [17, 28], [.93, 1], {
    ...clamp,
    easing: Easing.bezier(.16, 1, .3, 1),
  });
  const generatingOpacity = interpolate(frame, [67, 73, 80], [0, 1, 0], clamp);
  const horizontalInset = mobile ? 34 : 150;
  const paletteTop = mobile ? 108 : 104;

  return <div style={{position: 'absolute', inset: 0}}>
    <div style={{position: 'absolute', top: '50%', left: '50%', minWidth: mobile ? 240 : 300, display: 'grid', justifyItems: 'center', gap: mobile ? 14 : 18, padding: mobile ? '20px 22px 24px' : '24px 30px 28px', color: 'rgba(255,255,255,.74)', background: 'rgba(13,15,22,.95)', border: '1px solid rgba(255,255,255,.1)', borderRadius: mobile ? 24 : 30, boxShadow: '0 30px 80px rgba(28,33,62,.34)', opacity: shortcutOpacity, translate: '-50% -50%', scale: shortcutScale}}>
      <div style={{fontSize: mobile ? 13 : 16, fontWeight: 750, letterSpacing: 1.2}}>OPEN COMMAND SEARCH</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        {['⌘', 'K'].map((key) => <div key={key} style={{minWidth: mobile ? 54 : 64, height: mobile ? 50 : 60, display: 'grid', placeItems: 'center', color: '#fff', background: keyPress > .5 ? 'linear-gradient(180deg,#6677f4,#5367ef)' : 'linear-gradient(180deg,#343843,#242731)', border: '1px solid rgba(255,255,255,.13)', borderRadius: mobile ? 12 : 15, boxShadow: keyPress > .5 ? '0 2px 0 #3548bd' : '0 6px 0 #15171d', translate: `0 ${keyPress * 4}px`, fontSize: mobile ? 23 : 28, fontWeight: 800}}>{key}</div>)}
      </div>
    </div>

    <div style={{position: 'absolute', top: paletteTop, left: horizontalInset, right: horizontalInset, display: 'grid', gap: mobile ? 12 : 18, opacity: paletteOpacity, translate: `0 ${interpolate(frame, [17, 28], [24, 0], clamp)}px`, scale: paletteScale}}>
      <div style={{height: mobile ? 70 : 88, display: 'flex', alignItems: 'center', gap: mobile ? 14 : 20, padding: mobile ? '0 20px' : '0 34px', overflow: 'hidden', color: '#4e5664', background: 'rgba(255,255,255,.9)', border: '1px solid rgba(255,255,255,.96)', borderRadius: 999, boxShadow: '0 12px 42px rgba(89,101,180,.2)'}}>
        <div style={{width: mobile ? 30 : 38, height: mobile ? 30 : 38, flex: `0 0 ${mobile ? 30 : 38}px`, borderRadius: '50%', background: `conic-gradient(from ${frame * 7}deg,#5367ef,#8e71f4,#52c7d3,#5367ef)`, boxShadow: 'inset 0 0 0 9px rgba(255,255,255,.72), 0 3px 9px rgba(83,103,239,.24)'}} />
        <div style={{minWidth: 0, color: query ? '#4e5664' : '#727a89', fontSize: mobile ? 20 : 29, fontWeight: 650, letterSpacing: -1}}>{query || 'What do you want to create?'}</div>
        <div style={{width: 2, height: mobile ? 26 : 34, marginLeft: query ? -7 : 0, background: '#5367ef', opacity: frame % 16 < 9 ? 1 : 0}} />
      </div>

      <div style={{display: 'grid', gap: mobile ? 4 : 7, padding: mobile ? 12 : 18, overflow: 'hidden', background: 'rgba(255,255,255,.92)', border: '1px solid rgba(255,255,255,.96)', borderRadius: mobile ? 22 : 30, boxShadow: '0 20px 58px rgba(72,84,154,.18)'}}>
        {commands.map((command, index) => {
          const matches = !query || command.label.toLowerCase().includes(query);
          return <div key={command.label} style={{height: matches ? (mobile ? 56 : 68) : 0, display: 'flex', alignItems: 'center', gap: mobile ? 12 : 18, padding: matches ? (mobile ? '0 14px' : '0 20px') : '0 20px', overflow: 'hidden', color: index === 0 ? '#4659d5' : '#4a5261', background: index === 0 ? 'rgba(70,89,213,.065)' : 'transparent', borderRadius: mobile ? 13 : 17, opacity: matches ? 1 : 0}}>
            <div style={{width: mobile ? 25 : 31, color: index === 0 ? '#5367ef' : '#778090', fontSize: mobile ? 16 : 20, fontWeight: 800}}>{command.icon}</div>
            <div style={{flex: 1, fontSize: mobile ? 16 : 22, fontWeight: 680, letterSpacing: -.6}}>{command.label}</div>
            {command.shortcut ? <div style={{padding: mobile ? '5px 8px' : '7px 11px', color: '#858d9b', background: '#eaedff', borderRadius: 8, fontSize: mobile ? 11 : 14, fontWeight: 800}}>{command.shortcut}</div> : null}
          </div>;
        })}
      </div>
    </div>

    <div style={{position: 'absolute', top: '50%', left: '50%', display: 'flex', alignItems: 'center', gap: 12, padding: mobile ? '13px 18px' : '16px 24px', color: '#4e5664', background: 'rgba(255,255,255,.94)', border: '1px solid rgba(83,103,239,.12)', borderRadius: 999, boxShadow: '0 20px 58px rgba(83,103,239,.22)', opacity: generatingOpacity, translate: '-50% -50%', fontSize: mobile ? 15 : 20, fontWeight: 700, whiteSpace: 'nowrap'}}><span style={{color: '#5367ef'}}>✦</span> Generating an editable flow…</div>
  </div>;
};
