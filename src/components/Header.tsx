import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  APP_URL,
  industriesInCategory,
  industryCategories,
} from '../data/site'
import { resourceTags } from '../data/blog'
import styles from './Header.module.css'

function IndustryMenuLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className={styles.industryColumns}>
      {industryCategories.map((category) => (
        <div key={category.id} className={styles.industryColumn}>
          <p className={styles.columnLabel}>{category.label}</p>
          <ul className={styles.columnList}>
            {industriesInCategory(category).map((industry) => (
              <li key={industry.slug}>
                <Link
                  to={`/industries/${industry.slug}`}
                  className={styles.industryLink}
                  role="menuitem"
                  onClick={onNavigate}
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [resOpen, setResOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobileIndustriesRef = useRef<HTMLDivElement>(null)
  const resRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const resId = useId()

  useEffect(() => {
    if (!menuOpen && !resOpen) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        !menuRef.current?.contains(target) &&
        !mobileIndustriesRef.current?.contains(target)
      ) {
        setMenuOpen(false)
      }
      if (!resRef.current?.contains(target)) {
        setResOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setResOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, resOpen])

  const closeIndustries = () => setMenuOpen(false)

  const toggleIndustries = () => {
    setMenuOpen((open) => !open)
    setResOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="Loyaltys home">
          <img src="/logo.png" alt="Loyaltys" width={160} height={28} />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <div
            className={styles.dropdown}
            ref={menuRef}
            onMouseEnter={() => {
              setMenuOpen(true)
              setResOpen(false)
            }}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              type="button"
              className={`${styles.navLink} ${styles.dropdownTrigger} ${menuOpen ? styles.navLinkActive : ''}`}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={toggleIndustries}
            >
              Industries & Solutions
              <span className={styles.chevron} aria-hidden>
                ▾
              </span>
            </button>

            <div
              id={menuId}
              className={`${styles.dropdownPanel} ${menuOpen ? styles.dropdownPanelOpen : ''}`}
              role="menu"
              aria-label="Industries & Solutions"
            >
              <IndustryMenuLinks onNavigate={closeIndustries} />
            </div>
          </div>

          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Pricing
          </NavLink>

          <div
            className={styles.dropdown}
            ref={resRef}
            onMouseEnter={() => {
              setResOpen(true)
              setMenuOpen(false)
            }}
            onMouseLeave={() => setResOpen(false)}
          >
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `${styles.navLink} ${styles.dropdownTrigger} ${
                  isActive || resOpen ? styles.navLinkActive : ''
                }`
              }
              aria-expanded={resOpen}
              aria-controls={resId}
              aria-haspopup="true"
              onClick={() => setResOpen(false)}
            >
              Resources
              <span className={styles.chevron} aria-hidden>
                ▾
              </span>
            </NavLink>

            <div
              id={resId}
              className={`${styles.dropdownPanel} ${styles.dropdownPanelResources} ${resOpen ? styles.dropdownPanelOpen : ''}`}
              role="menu"
              aria-label="Resources"
            >
              <ul className={styles.resourcesCategoryList}>
                {resourceTags.map((tag) => (
                  <li key={tag.id}>
                    <Link
                      to={`/resources?tag=${tag.id}`}
                      className={styles.resourcesCategoryLink}
                      role="menuitem"
                      onClick={() => setResOpen(false)}
                      style={
                        {
                          '--cat-pastel': tag.pastel,
                          '--cat-ink': tag.ink,
                        } as React.CSSProperties
                      }
                    >
                      <span className={styles.resourcesCategorySymbol} aria-hidden>
                        {tag.symbol}
                      </span>
                      {tag.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className={styles.dropdownFooter}>
                <Link
                  to="/resources"
                  className={styles.dropdownBrowse}
                  onClick={() => setResOpen(false)}
                >
                  Browse all resources
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className={styles.actions}>
          <a href={APP_URL} className={styles.login}>
            Log in
          </a>
          <a href={APP_URL} className={styles.cta}>
            Get started
          </a>
        </div>
      </div>

      <div ref={mobileIndustriesRef} className={styles.mobileIndustriesWrap}>
        <nav className={styles.mobileNav} aria-label="Site">
          <div className={`container ${styles.mobileNavInner}`}>
            <button
              type="button"
              className={`${styles.mobileNavLink} ${menuOpen ? styles.mobileNavLinkActive : ''}`}
              aria-expanded={menuOpen}
              aria-controls={`${menuId}-mobile`}
              aria-haspopup="true"
              onClick={toggleIndustries}
            >
              Industries
            </button>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}` : styles.mobileNavLink
              }
              onClick={closeIndustries}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                isActive ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}` : styles.mobileNavLink
              }
              onClick={closeIndustries}
            >
              Resources
            </NavLink>
          </div>
        </nav>

        <div
          id={`${menuId}-mobile`}
          className={`${styles.mobileIndustriesPanel} ${menuOpen ? styles.mobileIndustriesPanelOpen : ''}`}
          role="menu"
          aria-label="Industries & Solutions"
        >
          <div className={`container ${styles.mobileIndustriesInner}`}>
            <IndustryMenuLinks onNavigate={closeIndustries} />
          </div>
        </div>
      </div>
    </header>
  )
}
