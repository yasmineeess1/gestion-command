import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRename: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function Sidebar({ projects, isOpen, onRename, onDelete }: SidebarProps) {
  console.log('Sidebar re-render');
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h3 className={styles.title}>Mes Projets</h3>
      <ul className={styles.list}>
        {projects.map((p) => (
          <li key={p.id} className={styles.itemWrapper}>
            <NavLink
              to={`/projects/${p.id}`}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ''}`
              }
            >
              <div className={styles.projectInfo}>
                <span className={styles.dot} style={{ background: p.color }} />
                <span className={styles.projectName}>{p.name}</span>
              </div>
            </NavLink>

            {/* Zone des boutons d'action */}
            <div className={styles.actions}>
              <button 
                onClick={() => onRename(p)} 
                className={styles.actionBtn}
                title="Renommer"
              >
                ✎
              </button>
              <button 
                onClick={() => onDelete(p.id)} 
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                title="Supprimer"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}