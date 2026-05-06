window.addEventListener('load', () => {
  /* Function */
  /**
   * Same as 'document.querySelector' (Idea from jQuery)
   * @param {string} selector selector
   * @returns document.querySelector(selector)
   */
  function $(selector) {
    return document.querySelector(selector);
  }
  /**
   * For media query
   */
  function sideMenu() {
    if (window.innerWidth > 1366) {
      $('body').classList.add('sideMenu');
    } else {
      $('body').classList.remove('sideMenu');
    }
  }

  /* Event Delegation Pattern */
  // window - load
  sideMenu();

  // window - resize
  window.addEventListener('resize', () => {
    sideMenu();
  });

  // document - keyup
  document.addEventListener('keyup', event => {
    switch (event.key) {
      case 'Escape':
        $('#search').classList.remove('on');
        break;

      default:
        break;
    }
  });

  // body - click
  $('body').addEventListener('click', event => {
    const target = event.target.id;

    switch (target) {
      case 'search':
        $('#search').classList.toggle('on');
        $('#search input').focus();
        $('header').addEventListener('mouseleave', () => {
          $('#search').classList.remove('on');
        });
        break;

      default:
        break;
    }
  });
});

<ButtonSingle
  click={() => {
    window.open('https://github.com/');
  }}
></ButtonSingle>;
