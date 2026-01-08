let listeners = [];
let current = null;

export function subscribe(cb) {
  listeners.push(cb);
  // send current state immediately
  cb(current);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function emit() {
  listeners.forEach((cb) => cb(current));
}

export function openQuickView(product) {
  current = { open: true, product };
  emit();
}

export function closeQuickView() {
  current = { open: false, product: null };
  emit();
}

export function getCurrent() {
  return current;
}
