const routeToLabel = {
  'about': 'About',
  'admission': 'Admissions',
  'admissions': 'Admissions',
  'schools': 'Schools',
  'academics': 'Academics',
  'news': 'News',
  'events': 'Events',
  'news-and-events': 'News and Events'
};

const routePathToLabel = {
  '/en/about/ada-university': 'ADA University',
  '/en/about/Italy-Azerbaijan-university': 'Italy-Azerbaijan University',
  '/en/admission/find-your-program': 'Find your Program',
  '/en/schools/site': 'School of IT and Engineering',
  '/en/schools/sb': 'School of Business',
  '/en/academics/research': 'Research'
};

export const generateBreadcrumbs = (pathname, currentPageLabel = null, filterName = null) => {
  const breadcrumbs = [{ label: 'Home', link: '/en' }];

  if (pathname === '/en' || pathname === '/') {
    return breadcrumbs;
  }

  const segments = pathname.replace(/^\/+/, '').split('/');
  const pathSegments = segments.filter(seg => seg !== 'en');

  if (pathSegments.length === 0) {
    return breadcrumbs;
  }

  const firstSegment = pathSegments[0];
  const firstSegmentLabel = routeToLabel[firstSegment] || 
                            firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);

  const firstSegmentLink = `/en/${firstSegment}`;

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

  if (pathSegments.length >= 2 && pathSegments[1].match(/^\d+$/)) {
    breadcrumbs.push({
      label: firstSegmentLabel,
      link: firstSegmentLink
    });
    if (currentPageLabel) {
      breadcrumbs.push({
        label: currentPageLabel,
        link: null
      });
    }
    return breadcrumbs;
  }

  if (pathSegments.length >= 2) {
    breadcrumbs.push({
      label: firstSegmentLabel,
      link: firstSegmentLink
    });
    
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

  if (pathSegments.length === 1) {
    breadcrumbs.push({
      label: firstSegmentLabel,
      link: filterName ? firstSegmentLink : null
    });
    
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

