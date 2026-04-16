import { useState } from "react";
import HeaderMUI from "../components/HeaderMUI";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import ProjectForm from "../components/ProjectForm";
import styles from "./Dashboard.module.css";


import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store"; 
import { logout } from "../features/auth/authSlice";
import useProjects from '../hooks/useProjects'; 

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  
  const { 
    projects, 
    columns, 
    loading, 
    error, 
    addProject, 
    renameProject, 
    deleteProject 
  } = useProjects();

  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const dangerousName = '<img src=x onerror=alert("HACK")>';

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <HeaderMUI
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen((p) => !p)}
        userName={user?.name}
        onLogout={() => dispatch(logout())}
      />

      <div className={styles.body}>
        <Sidebar
          projects={projects}
          isOpen={sidebarOpen}
          onRename={renameProject}
          onDelete={deleteProject}
        />

        <div className={styles.content}>
          <div className={styles.toolbar}>
            {error && <div className={styles.error}>{error}</div>}
            
            <div dangerouslySetInnerHTML={{ __html: dangerousName }} />

            {!showForm ? (
              <button
                className={styles.addBtn}
                onClick={() => setShowForm(true)}
              >
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel="Créer"
                onSubmit={async (name, color) => {
                  await addProject(name, color);
                  setShowForm(false); // Ferme le formulaire après ajout
                }}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>

          {/* MainContent est mémoïsé, il ne re-rendra que si columns change */}
          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}