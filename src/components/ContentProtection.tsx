import { useEffect } from 'react';

/** Inputs, textareas, selects, and `[data-allow-copy]` keep normal select / copy / context menu. */
function isFormOrAllowedTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.closest('[data-allow-copy]')) return true;
  return !!target.closest('input, textarea, select, option, [contenteditable="true"]');
}

/**
 * Discourages casual copying, saving, view-source, image drag, and context menu.
 * Not a security boundary — bypassable via devtools, extensions, or disabling JS.
 */
export default function ContentProtection() {
  useEffect(() => {
    const blockDefault = (e: Event) => {
      if (isFormOrAllowedTarget(e.target)) return;
      e.preventDefault();
    };

    const onDragStart = (e: DragEvent) => {
      if (isFormOrAllowedTarget(e.target)) return;
      if (e.dataTransfer?.types?.includes('Files')) return;
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isFormOrAllowedTarget(e.target)) return;
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const key = e.key?.toLowerCase();
      if (['c', 'x', 'a', 's', 'u'].includes(key)) {
        e.preventDefault();
      }
    };

    const opts = { capture: true } as const;
    document.addEventListener('contextmenu', blockDefault, opts);
    document.addEventListener('copy', blockDefault, opts);
    document.addEventListener('cut', blockDefault, opts);
    document.addEventListener('dragstart', onDragStart, opts);
    document.addEventListener('keydown', onKeyDown, opts);

    document.body.classList.add('content-protection');

    return () => {
      document.removeEventListener('contextmenu', blockDefault, opts);
      document.removeEventListener('copy', blockDefault, opts);
      document.removeEventListener('cut', blockDefault, opts);
      document.removeEventListener('dragstart', onDragStart, opts);
      document.removeEventListener('keydown', onKeyDown, opts);
      document.body.classList.remove('content-protection');
    };
  }, []);

  return null;
}
