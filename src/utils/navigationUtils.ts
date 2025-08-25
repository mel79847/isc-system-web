import { roles } from '../constants/roles';

const { ADMIN, PROFESSOR, STUDENT, INTERN, PROGRAM_DIRECTOR, SUPERVISOR } = roles;

/**
 * Get the default home route for a user based on their roles
 * @param userRoles Array of user roles
 * @returns The appropriate home route path
 */
const getDefaultHomeRoute = (userRoles: string[]): string => {
  // Check if user has roles that can access dashboard
  const dashboardRoles = [ADMIN, STUDENT, PROFESSOR, PROGRAM_DIRECTOR];
  const hasDashboardAccess = userRoles.some((role) => dashboardRoles.includes(role));

  if (hasDashboardAccess) {
    return '/dashboard';
  }

  // For INTERN and SUPERVISOR roles, redirect to events page as their main page
  if (userRoles.includes(INTERN) || userRoles.includes(SUPERVISOR)) {
    return '/events';
  }

  // Fallback to dashboard (this should rarely happen with proper role assignments)
  return '/dashboard';
};

export default getDefaultHomeRoute;
