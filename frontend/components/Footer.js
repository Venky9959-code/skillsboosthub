export default function Footer() {
  return (
    <footer className="footer">
      <div className="links">
        <a href="/contact">Contact</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="/refund">Refund</a>
      </div>

      <p>© 2026 SkillsBoostHub. All rights reserved.</p>

      <style jsx>{`
        .footer {
          background: #111;
          color: #fff;
          text-align: center;
          padding: 30px;
        }
        .links {
          margin-bottom: 10px;
        }
        a {
          color: #fff;
          margin: 0 10px;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
}