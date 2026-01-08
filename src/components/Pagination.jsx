const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          buttons.push(i);
        }
        buttons.push('...');
        buttons.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        buttons.push(1);
        buttons.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          buttons.push(i);
        }
      } else {
        buttons.push(1);
        buttons.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(i);
        }
        buttons.push('...');
        buttons.push(totalPages);
      }
    }

    return buttons;
  };

  if (totalPages <= 1) {
    return null;
  }

  const lightBlue = '#003366';

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
      <button
        type="button"
        className="btn"
        style={{
          width: '40px',
          height: '40px',
          padding: 0,
          backgroundColor: 'transparent',
          color: currentPage === 1 ? '#ccc' : lightBlue,
          border: `1px solid ${lightBlue}`,
          borderRadius: '4px',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          opacity: currentPage === 1 ? 0.5 : 1
        }}
        disabled={currentPage === 1}
        onMouseEnter={(e) => {
          if (currentPage !== 1 && !e.target.disabled) {
            e.target.style.backgroundColor = lightBlue;
            e.target.style.color = '#fff';
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1 && !e.target.disabled) {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = lightBlue;
          }
        }}
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        &lt;
      </button>

      {getPaginationButtons().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          );
        }
        
        const isActive = currentPage === page;
        
        return (
          <button
            key={page}
            type="button"
            className="btn"
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
              backgroundColor: isActive ? lightBlue : 'transparent',
              color: isActive ? '#fff' : lightBlue,
              border: `1px solid ${lightBlue}`,
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.target.style.backgroundColor = lightBlue;
                e.target.style.color = '#fff';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = lightBlue;
              }
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className="btn"
        style={{
          width: '40px',
          height: '40px',
          padding: 0,
          backgroundColor: 'transparent',
          color: currentPage === totalPages ? '#ccc' : lightBlue,
          border: `1px solid ${lightBlue}`,
          borderRadius: '4px',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          opacity: currentPage === totalPages ? 0.5 : 1
        }}
        disabled={currentPage === totalPages}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages && !e.target.disabled) {
            e.target.style.backgroundColor = lightBlue;
            e.target.style.color = '#fff';
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages && !e.target.disabled) {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = lightBlue;
          }
        }}
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
