import React, { useState } from 'react';
import {
  Layers, Plus, LayoutDashboard, UserCog,
  CheckCircle2, Clock, AlertCircle,
  User, Hash, Building2, DoorOpen,
  UploadCloud, RefreshCw,
} from 'lucide-react';
import { initialComplaints, blockOptions, categoryOptions } from './data/mockData';

// ─── Helpers ────────────────────────────────────────────────────────────────

let idCounter = 1006;
function generateId() { return 'CPS-' + idCounter++; }

function StatusBadge({ status }) {
  const styles = {
    Submitted:   { bg: '#F1EFE8', color: '#5F5E5A', dot: '#888780' },
    'In Progress': { bg: '#FAEEDA', color: '#854F0B', dot: '#EF9F27' },
    Resolved:    { bg: '#EAF3DE', color: '#3B6D11', dot: '#639922' },
  };
  const s = styles[status] || styles['Submitted'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 11, fontWeight: 500, padding: '3px 10px',
      borderRadius: 99, background: s.bg, color: s.color,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: '#f9fafb', borderRadius: 10, padding: '1rem',
      flex: 1, minWidth: 0,
    }}>
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: color || '#111827' }}>{value}</div>
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

function Navbar({ page, setPage }) {
  const links = [
    { id: 'submit',    label: 'Submit Problem',  icon: <Plus size={13} /> },
    { id: 'dashboard', label: 'My Dashboard',    icon: <LayoutDashboard size={13} /> },
    { id: 'admin',     label: 'Admin Panel',     icon: <UserCog size={13} /> },
  ];
  return (
    <nav style={{
      background: '#fff', borderBottom: '1px solid #e5e7eb',
      padding: '0 1.5rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 56,
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 15 }}>
        <Layers size={20} color="#185FA5" />
        Campus Problem Solver
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 4 }}>
        {links.map(l => (
          <button key={l.id} onClick={() => setPage(l.id)} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 14px', borderRadius: 8, border: 'none',
            cursor: 'pointer', fontSize: 13, fontWeight: page === l.id ? 600 : 400,
            background: page === l.id ? '#EFF6FF' : 'transparent',
            color: page === l.id ? '#185FA5' : '#6b7280',
            transition: 'all 0.15s',
          }}>
            {l.icon} {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Submit Page ─────────────────────────────────────────────────────────────

function SubmitPage({ complaints, setComplaints }) {
  const [form, setForm] = useState({
    name: '', reg: '', block: '', room: '', category: 'Infrastructure', desc: '',
  });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(null); // tracking ID after submit
  const [fileName, setFileName] = useState('');

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Name is required.';
    if (!form.reg.trim())   e.reg   = 'Registration number is required.';
    if (!form.block)        e.block = 'Please select a block.';
    if (!form.room.trim())  e.room  = 'Room number is required.';
    if (!form.desc.trim())  e.desc  = 'Please describe the problem.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const id = generateId();
      const newComplaint = {
        id, ...form, status: 'Submitted', updated: 'Just now', resolution: '',
      };
      setComplaints(prev => [newComplaint, ...prev]);
      setSuccess(id);
      setForm({ name: '', reg: '', block: '', room: '', category: 'Infrastructure', desc: '' });
      setFileName('');
      setLoading(false);
      setTimeout(() => setSuccess(null), 7000);
    }, 1400);
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '9px 12px',
    border: `1px solid ${errors[field] ? '#ef4444' : '#d1d5db'}`,
    borderRadius: 8, fontSize: 14, outline: 'none',
    background: '#fff', color: '#111827',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
  });

  return (
    <div className="fade-in" style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Submit a Problem</h1>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
        Fill in your details and describe the campus issue.
      </p>

      {/* Success Banner */}
      {success && (
        <div style={{
          background: '#EAF3DE', border: '1px solid #C0DD97', borderRadius: 10,
          padding: '1rem 1.25rem', marginBottom: 20,
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <CheckCircle2 size={18} color="#3B6D11" style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: 14, color: '#27500A' }}>Complaint Submitted Successfully</strong>
            <p style={{ fontSize: 13, color: '#3B6D11', marginTop: 2 }}>
              Your issue has been logged. Track it using your ID below.
            </p>
            <span style={{
              fontFamily: 'monospace', fontSize: 12, background: '#C0DD97',
              color: '#173404', padding: '2px 8px', borderRadius: 4,
              display: 'inline-block', marginTop: 6,
            }}>
              Tracking ID: {success}
            </span>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div style={{
        background: '#fff', border: '1px solid #e5e7eb',
        borderRadius: 14, padding: '1.5rem',
      }}>
        {/* Section: Student Details */}
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', marginBottom: 16 }}>
          Student Details
        </div>

        {/* Row 1: Name + Reg */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 13, color: '#374151', display: 'block', marginBottom: 6 }}>
              Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text" placeholder="e.g. Riya Sharma"
              value={form.name} onChange={e => set('name', e.target.value)}
              style={inputStyle('name')}
            />
            {errors.name && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.name}</p>}
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#374151', display: 'block', marginBottom: 6 }}>
              Registration No. <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text" placeholder="e.g. 22BCS045"
              value={form.reg} onChange={e => set('reg', e.target.value)}
              style={inputStyle('reg')}
            />
            {errors.reg && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.reg}</p>}
          </div>
        </div>

        {/* Row 2: Block + Room */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 13, color: '#374151', display: 'block', marginBottom: 6 }}>
              Block / Hostel <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={form.block} onChange={e => set('block', e.target.value)}
              style={{ ...inputStyle('block'), cursor: 'pointer' }}
            >
              <option value="">Select block…</option>
              {blockOptions.map(b => <option key={b}>{b}</option>)}
            </select>
            {errors.block && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.block}</p>}
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#374151', display: 'block', marginBottom: 6 }}>
              Room No. <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text" placeholder="e.g. 204, Lab-3, Seminar Hall"
              value={form.room} onChange={e => set('room', e.target.value)}
              style={inputStyle('room')}
            />
            {errors.room && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.room}</p>}
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', marginBottom: 20 }} />

        {/* Section: Problem Details */}
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', marginBottom: 16 }}>
          Problem Details
        </div>

        {/* Row 3: Category + Upload */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 13, color: '#374151', display: 'block', marginBottom: 6 }}>
              Category
            </label>
            <select
              value={form.category} onChange={e => set('category', e.target.value)}
              style={{ ...inputStyle('category'), cursor: 'pointer' }}
            >
              {categoryOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#374151', display: 'block', marginBottom: 6 }}>
              Attach Image <span style={{ color: '#9ca3af' }}>(optional)</span>
            </label>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 8,
              border: '1px dashed #d1d5db', borderRadius: 8, padding: '9px 12px',
              cursor: 'pointer', fontSize: 13, color: '#6b7280',
              transition: 'background 0.15s',
            }}>
              <UploadCloud size={16} color="#9ca3af" />
              <span>{fileName || 'Click to upload'}</span>
              <input
                type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => setFileName(e.target.files[0]?.name || '')}
              />
            </label>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, color: '#374151', display: 'block', marginBottom: 6 }}>
            Problem Description <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            placeholder="Describe your issue — exact location, what happened, since when…"
            value={form.desc} onChange={e => set('desc', e.target.value)}
            rows={4}
            style={{ ...inputStyle('desc'), resize: 'vertical', minHeight: 110 }}
          />
          {errors.desc && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.desc}</p>}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit} disabled={loading}
          style={{
            background: loading ? '#93c5fd' : '#185FA5', color: '#fff',
            border: 'none', borderRadius: 8, padding: '10px 24px',
            fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            transition: 'background 0.15s',
          }}
        >
          {loading && <span className="spinner" />}
          {loading ? 'Submitting…' : 'Submit Complaint'}
        </button>
      </div>
    </div>
  );
}

// ─── User Dashboard ───────────────────────────────────────────────────────────

function DashboardPage({ complaints, setComplaints }) {
  const [refreshing, setRefreshing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const total      = complaints.length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved   = complaints.filter(c => c.status === 'Resolved').length;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Randomly advance some "Submitted" items to "In Progress"
      setComplaints(prev =>
        prev.map(c =>
          c.status === 'Submitted' && Math.random() > 0.65
            ? { ...c, status: 'In Progress', updated: 'Just now' }
            : c
        )
      );
      setRefreshing(false);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    }, 900);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>My Dashboard</h1>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
        All your submitted complaints at a glance.
      </p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <StatCard label="Total Submitted" value={total} />
        <StatCard label="In Progress"     value={inProgress} color="#854F0B" />
        <StatCard label="Resolved"        value={resolved}   color="#3B6D11" />
      </div>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>Your Complaints</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {toastVisible && (
            <span style={{ fontSize: 12, color: '#3B6D11' }}>Updated!</span>
          )}
          <button
            onClick={handleRefresh}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', border: '1px solid #e5e7eb', borderRadius: 8,
              background: '#fff', fontSize: 13, cursor: 'pointer',
              color: '#374151', transition: 'background 0.15s',
            }}
          >
            <RefreshCw size={13} style={{ animation: refreshing ? 'spin 0.7s linear infinite' : 'none' }} />
            Refresh
          </button>
        </div>
      </div>

      {/* Complaint cards */}
      {complaints.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af', fontSize: 14 }}>
          No complaints submitted yet.
        </div>
      ) : (
        complaints.map(c => (
          <div key={c.id} style={{
            background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
            padding: '1rem 1.25rem', marginBottom: 12,
            transition: 'box-shadow 0.15s',
          }}>
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: '#111827', flex: 1 }}>
                {c.desc.length > 120 ? c.desc.slice(0, 120) + '…' : c.desc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                <StatusBadge status={c.status} />
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#9ca3af' }}>{c.id}</span>
              </div>
            </div>
            {/* Meta row */}
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
              {c.category} · {c.updated}
            </p>
            {/* Student chips */}
            <div style={{
              display: 'flex', gap: 16, flexWrap: 'wrap',
              paddingTop: 8, borderTop: '1px solid #f3f4f6',
            }}>
              {[
                { icon: <User size={11} />,      text: c.name  },
                { icon: <Hash size={11} />,      text: c.reg   },
                { icon: <Building2 size={11} />, text: c.block },
                { icon: <DoorOpen size={11} />,  text: `Room ${c.room}` },
              ].map((chip, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#6b7280' }}>
                  <span style={{ opacity: 0.6 }}>{chip.icon}</span> {chip.text}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

function AdminPage({ complaints, setComplaints }) {
  // Local edits before saving
  const [edits, setEdits] = useState({});

  const setEdit = (id, field, val) => {
    setEdits(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: val },
    }));
  };

  const handleUpdate = (id) => {
    const e = edits[id] || {};
    setComplaints(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, ...e, updated: 'Just now' }
          : c
      )
    );
    setEdits(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const total   = complaints.length;
  const pending = complaints.filter(c => c.status === 'Submitted').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="fade-in" style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Admin Panel</h1>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
        Manage and resolve all campus complaints.
      </p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <StatCard label="All Complaints" value={total} />
        <StatCard label="Pending"        value={pending}  color="#5F5E5A" />
        <StatCard label="Resolved"       value={resolved} color="#3B6D11" />
      </div>

      {/* Table card */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['Student','Reg. No.','Block','Room','Description','Category','Status','Resolution Note','Updated','Action'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 12px',
                    fontSize: 10, fontWeight: 600, color: '#9ca3af',
                    borderBottom: '1px solid #e5e7eb',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => {
                const edit = edits[c.id] || {};
                const currentStatus = edit.status ?? c.status;
                const currentNote   = edit.resolution ?? c.resolution;
                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    <td style={{ padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{c.name}</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#6b7280', whiteSpace: 'nowrap' }}>{c.reg}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: '#F1EFE8', color: '#5F5E5A', fontSize: 10, padding: '2px 8px', borderRadius: 99, whiteSpace: 'nowrap' }}>
                        {c.block}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#6b7280' }}>{c.room}</td>
                    <td style={{ padding: '10px 12px', maxWidth: 180, lineHeight: 1.4, color: '#374151' }}>
                      {c.desc.length > 60 ? c.desc.slice(0, 60) + '…' : c.desc}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: '#EFF6FF', color: '#1d4ed8', fontSize: 10, padding: '2px 8px', borderRadius: 99 }}>
                        {c.category}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <StatusBadge status={currentStatus} />
                    </td>
                    <td style={{ padding: '10px 12px', minWidth: 140 }}>
                      <input
                        type="text"
                        value={currentNote}
                        placeholder="Add note…"
                        onChange={e => setEdit(c.id, 'resolution', e.target.value)}
                        style={{
                          width: '100%', padding: '4px 8px', fontSize: 11,
                          border: '1px solid #e5e7eb', borderRadius: 6,
                          outline: 'none', fontFamily: 'inherit',
                          background: '#fff', color: '#111827',
                        }}
                      />
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: 10, color: '#9ca3af', whiteSpace: 'nowrap' }}>{c.updated}</td>
                    <td style={{ padding: '10px 12px', minWidth: 120 }}>
                      <select
                        value={currentStatus}
                        onChange={e => setEdit(c.id, 'status', e.target.value)}
                        style={{
                          width: '100%', padding: '4px 6px', fontSize: 11,
                          border: '1px solid #e5e7eb', borderRadius: 6,
                          marginBottom: 6, cursor: 'pointer',
                          background: '#fff', color: '#111827',
                          fontFamily: 'inherit',
                        }}
                      >
                        <option>Submitted</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                      <button
                        onClick={() => handleUpdate(c.id)}
                        style={{
                          width: '100%', padding: '4px 0', fontSize: 11, fontWeight: 600,
                          background: '#185FA5', color: '#fff', border: 'none',
                          borderRadius: 6, cursor: 'pointer', transition: 'background 0.15s',
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage]             = useState('submit');
  const [complaints, setComplaints] = useState(initialComplaints);

  const renderPage = () => {
    if (page === 'submit')    return <SubmitPage    complaints={complaints} setComplaints={setComplaints} />;
    if (page === 'dashboard') return <DashboardPage complaints={complaints} setComplaints={setComplaints} />;
    if (page === 'admin')     return <AdminPage     complaints={complaints} setComplaints={setComplaints} />;
  };

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      {renderPage()}
    </div>
  );
}