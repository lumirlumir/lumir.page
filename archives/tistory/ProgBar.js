import './ProgBar.scss';

export default function ProgBar() {
  window.addEventListener('scroll', () => {
    document
      .querySelector('html')
      .style.setProperty(
        '--scrollRatio',
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)).toFixed(4),
      );
  });

  return <div className="ProgBar" />;
}
