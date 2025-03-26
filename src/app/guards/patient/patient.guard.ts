import { CanActivateFn } from '@angular/router';

export const patientGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

if (user?.role === 'Patient') {
  return true;
} else {
  alert('Access Denied: Patients only!');
  return false;
}
};

