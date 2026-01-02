/**
 * Maps route segments to display names for breadcrumbs
 */
const routeToLabel = {
  'about': 'About',
  'admission': 'Admissions',
  'admissions': 'Admissions', // alternative
  'schools': 'Schools',
  'academics': 'Academics',
  'news': 'News',
  'events': 'Events',
  'news-and-events': 'News and Events'
};

/**
 * Maps specific routes to their display names
 */
const routePathToLabel = {
  '/en/about/ada-university': 'ADA University',
  '/en/about/Italy-Azerbaijan-university': 'Italy-Azerbaijan University',
  '/en/admission/find-your-program': 'Find your Program',
  '/en/schools/site': 'School of IT and Engineering',
  '/en/schools/sb': 'School of Business',
  '/en/academics/research': 'Research'
};

/**
 * Generates breadcrumb array from current pathname
 * @param {string} pathname - Current route pathname (e.g., '/en/schools/site')
 * @param {string} currentPageLabel - Optional custom label for the current page
 * @param {string} filterName - Optional filter name to add to breadcrumb (e.g., 'Academic', 'ADA School')
 * @returns {Array} Breadcrumb array with {label, link} objects
 */
export const generateBreadcrumbs = (pathname, currentPageLabel = null, filterName = null) => {
  // Always start with Home
  const breadcrumbs = [{ label: 'Home', link: '/en' }];

  // If it's the home page, return just Home
  if (pathname === '/en' || pathname === '/') {
    return breadcrumbs;
  }

  // Remove leading slash and split path into segments
  const segments = pathname.replace(/^\/+/, '').split('/');
  // Remove 'en' if present
  const pathSegments = segments.filter(seg => seg !== 'en');

  if (pathSegments.length === 0) {
    return breadcrumbs;
  }

  // Get the first segment (second level route)
  const firstSegment = pathSegments[0];
  const firstSegmentLabel = routeToLabel[firstSegment] || 
                            firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);

  // Build the link for the first segment
  const firstSegmentLink = `/en/${firstSegment}`;

  // Check if we have an exact route match for the full path
  if (routePathToLabel[pathname]) {
    breadcrumbs.push({
      label: firstSegmentLabel,
      link: firstSegmentLink
    });
    breadcrumbs.push({
      label: currentPageLabel || routePathToLabel[pathname],
      link: null
    });
    return breadcrumbs;
  }

  // For detail pages (with :id parameter)
  if (pathSegments.length >= 2 && pathSegments[1].match(/^\d+$/)) {
    // It's a detail page like /en/news/123
    breadcrumbs.push({
      label: firstSegmentLabel,
      link: firstSegmentLink
    });
    // The current page label should be passed in
    if (currentPageLabel) {
      breadcrumbs.push({
        label: currentPageLabel,
        link: null
      });
    }
    return breadcrumbs;
  }

  // For two-level routes like /en/about/ada-university
  if (pathSegments.length >= 2) {
    breadcrumbs.push({
      label: firstSegmentLabel,
      link: firstSegmentLink
    });
    
    // Use custom label if provided, otherwise try to format the last segment
    const lastSegment = pathSegments[pathSegments.length - 1];
    const pageLabel = currentPageLabel || 
                     lastSegment.split('-').map(word => 
                       word.charAt(0).toUpperCase() + word.slice(1)
                     ).join(' ');
    
    breadcrumbs.push({
      label: pageLabel,
      link: null
    });
    return breadcrumbs;
  }

  // For single-level routes like /en/news or /en/events
  if (pathSegments.length === 1) {
    breadcrumbs.push({
      label: firstSegmentLabel,
      link: filterName ? firstSegmentLink : null
    });
    
    // Add filter name if provided
    if (filterName) {
      breadcrumbs.push({
        label: filterName,
        link: null
      });
    }
    
    return breadcrumbs;
  }

  return breadcrumbs;
};

