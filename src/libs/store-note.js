const NOTE = 'note';

export function readNote() {
  if (localStorage.getItem(NOTE)) {
    return JSON.parse(localStorage.getItem(NOTE));
  }

  return '';
}

export function saveNote(note) {
  localStorage.setItem(NOTE, JSON.stringify(note));
}

export function deleteNote() {
  localStorage.removeItem(NOTE);
}