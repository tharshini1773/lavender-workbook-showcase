import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Award, 
  Download, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  X, 
  Check, 
  FileText, 
  Image as ImageIcon, 
  Loader2, 
  Upload, 
  Calendar, 
  Building2,
  ArrowUpRight,
  Sparkles,
  Lock,
  Unlock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  KeyRound,
  FileCheck2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Certificate, 
  getCertificates, 
  addCertificate, 
  updateCertificate, 
  deleteCertificate,
  loginAdmin,
  sendAdminPasswordReset,
  isAuthorizedAdmin,
  ADMIN_EMAIL,
  auth,
  signOut,
  onAuthStateChanged,
  User
} from "@/lib/firebase";
import { TiltCard } from "@/components/effects";

export function CertificatesSection({ 
  preview = false, 
  hideHeading = false 
}: { 
  preview?: boolean; 
  hideHeading?: boolean; 
}) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isAdmin = isAuthorizedAdmin(currentUser);
  
  // Modals & Panels
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showManageDrawer, setShowManageDrawer] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [deleteConfirmCert, setDeleteConfirmCert] = useState<Certificate | null>(null);

  // Admin Login state
  const [loginEmail, setLoginEmail] = useState(ADMIN_EMAIL);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [resetSentMessage, setResetSentMessage] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);

  // Upload/Edit Form state
  const [formTitle, setFormTitle] = useState("");
  const [formIssuer, setFormIssuer] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPublished, setFormPublished] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Certificates from Firestore
  const loadData = async () => {
    setLoading(true);
    const data = await getCertificates(isAdmin);
    setCertificates(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [isAdmin]);

  // Handle Admin Sign In (Strictly Single Admin)
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setResetSentMessage(null);
    setLoginLoading(true);

    try {
      await loginAdmin(loginEmail, loginPassword);
      setShowAdminLogin(false);
      setLoginPassword("");
      await loadData();
    } catch (err: any) {
      setLoginError(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Password Reset / Setup Link
  const handlePasswordReset = async () => {
    setResetLoading(true);
    setLoginError(null);
    setResetSentMessage(null);
    const target = loginEmail.trim() || ADMIN_EMAIL;
    const result = await sendAdminPasswordReset(target);
    setResetLoading(false);
    if (result.success) {
      setResetSentMessage(result.message);
    } else {
      setLoginError(result.message);
    }
  };

  // Handle Admin Sign Out
  const handleAdminSignOut = async () => {
    await signOut(auth);
    setShowManageDrawer(false);
    setShowUploadModal(false);
  };

  // Open Upload Modal
  const openNewModal = () => {
    if (!isAdmin) {
      setShowAdminLogin(true);
      return;
    }
    setEditingCert(null);
    setFormTitle("");
    setFormIssuer("");
    setFormDate(new Date().toISOString().slice(0, 10));
    setFormDesc("");
    setFormPublished(true);
    setSelectedFile(null);
    setUploadProgress(null);
    setFormError(null);
    setShowUploadModal(true);
  };

  // Open Edit Modal
  const openEditModal = (cert: Certificate) => {
    if (!isAdmin) {
      setShowAdminLogin(true);
      return;
    }
    setEditingCert(cert);
    setFormTitle(cert.title);
    setFormIssuer(cert.issuer);
    setFormDate(cert.issueDate);
    setFormDesc(cert.description || "");
    setFormPublished(cert.published);
    setSelectedFile(null);
    setUploadProgress(null);
    setFormError(null);
    setShowUploadModal(true);
  };

  // Save / Upload Certificate
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!isAdmin) {
      setFormError("Unauthorized: Only the authorized administrator can perform this action.");
      return;
    }

    if (!formTitle.trim() || !formIssuer.trim() || !formDate) {
      setFormError("Please provide Title, Issuer, and Issue Date.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingCert) {
        // Updating existing certificate in Firestore
        await updateCertificate(editingCert.id, {
          title: formTitle.trim(),
          issuer: formIssuer.trim(),
          issueDate: formDate,
          description: formDesc.trim(),
          published: formPublished,
        });
      } else {
        // Uploading new certificate
        if (!selectedFile) {
          setFormError("Please select a certificate file (PDF, JPG, or PNG).");
          setIsSubmitting(false);
          return;
        }

        await addCertificate(
          selectedFile,
          {
            title: formTitle.trim(),
            issuer: formIssuer.trim(),
            issueDate: formDate,
            description: formDesc.trim(),
            published: formPublished,
          },
          (pct) => setUploadProgress(pct)
        );
      }

      setShowUploadModal(false);
      setEditingCert(null);
      await loadData();
    } catch (err: any) {
      setFormError(err.message || "Failed to save certificate.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  // Toggle Published / Draft status (Admin only)
  const handleTogglePublish = async (cert: Certificate) => {
    if (!isAdmin) return;
    try {
      await updateCertificate(cert.id, { published: !cert.published });
      await loadData();
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    }
  };

  // Confirm and Execute Delete (Admin only)
  const confirmDelete = async () => {
    if (!deleteConfirmCert || !isAdmin) return;
    setIsDeleting(true);
    try {
      await deleteCertificate(deleteConfirmCert.id, deleteConfirmCert.storagePath);
      setDeleteConfirmCert(null);
      await loadData();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const displayedCerts = preview ? certificates.slice(0, 3) : certificates;
  const publishedCount = certificates.filter(c => c.published).length;
  const draftCount = certificates.length - publishedCount;

  return (
    <section className="section bg-card relative overflow-hidden">
      <div className="aurora-orb-2" />
      <div className="page-width relative z-10">
        
        {/* Top Header & Public / Admin Controls */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          {!hideHeading ? (
            <div>
              <div className="eyebrow">Recognitions & Learning</div>
              <h2 className="section-title text-gradient-purple">My Certificates.</h2>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Verified technical certificates, completed courses, and academic recognitions.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={openNewModal}
                  variant="portfolio" 
                  size="default" 
                  className="cursor-pointer gap-2 neon-glow-btn text-xs"
                >
                  <Plus size={15} /> Upload Certificate
                </Button>
                <Button 
                  onClick={() => setShowManageDrawer(!showManageDrawer)}
                  variant="outline" 
                  size="default" 
                  className="cursor-pointer text-xs gap-1.5 glass-panel"
                >
                  <SlidersHorizontal size={14} className="text-primary" /> Manage ({certificates.length})
                </Button>
                <Button 
                  onClick={handleAdminSignOut}
                  variant="ghost" 
                  size="default" 
                  className="cursor-pointer text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                  title="Sign out of Admin Portal"
                >
                  <Unlock size={14} /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {preview && (
                  <Button asChild variant="portfolioOutline" size="sm" className="glass-panel text-xs">
                    <Link to="/certificates" className="gap-1.5">
                      View All Certificates <ArrowUpRight size={13} />
                    </Link>
                  </Button>
                )}
                {/* Single Admin Portal Access Button */}
                <Button 
                  onClick={() => {
                    setLoginError(null);
                    setResetSentMessage(null);
                    setShowAdminLogin(true);
                  }}
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-muted-foreground hover:text-primary gap-1.5 cursor-pointer"
                  title="Authorized Administrator Portal"
                >
                  <Lock size={12} /> Admin Portal
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Admin Dashboard Active Banner (Shown only to authenticated admin) */}
        {isAdmin && (
          <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/8 p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">Admin Portal Active</span>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    Single-Admin Authorized
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                  Logged in as: {ADMIN_EMAIL}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-card/80 border border-border text-foreground font-medium">
                Total: <strong className="text-primary">{certificates.length}</strong>
              </span>
              <span className="px-3 py-1 rounded-lg bg-card/80 border border-border text-foreground font-medium">
                Published: <strong className="text-emerald-600">{publishedCount}</strong>
              </span>
              {draftCount > 0 && (
                <span className="px-3 py-1 rounded-lg bg-card/80 border border-border text-amber-600 font-medium">
                  Drafts: <strong>{draftCount}</strong>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Content Area: Certificates Grid */}
        {loading ? (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="animate-spin text-primary" size={28} />
            <p className="mt-3 text-xs font-medium">Loading verified certificates...</p>
          </div>
        ) : displayedCerts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border/80 bg-secondary/30 p-12 text-center backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Award size={28} />
            </div>
            <h3 className="mt-4 font-display text-2xl font-medium">No certificates published yet</h3>
            <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
              {isAdmin 
                ? "Click 'Upload Certificate' above to add your verified technical credentials and certificates."
                : "Verified certifications, course achievements, and academic credentials will appear here once published by Tharshini."}
            </p>
            {isAdmin && (
              <Button onClick={openNewModal} variant="portfolio" size="sm" className="mt-6 gap-2 cursor-pointer neon-glow-btn">
                <Plus size={15} /> Upload First Certificate
              </Button>
            )}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedCerts.map((cert) => (
              <TiltCard key={cert.id} className="rounded-2xl">
                <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-lg h-full">
                  <div>
                    {/* Top Row: File type & Admin Controls */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-primary">
                        {cert.fileType === "pdf" ? <FileText size={13} /> : <ImageIcon size={13} />}
                        {cert.fileType.toUpperCase()}
                      </span>

                      {/* Admin-only controls */}
                      {isAdmin ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(cert)}
                            className={`text-[10px] rounded-full px-2.5 py-0.5 font-semibold cursor-pointer border transition-colors ${
                              cert.published 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20' 
                                : 'bg-amber-500/10 border-amber-500/20 text-amber-600 hover:bg-amber-500/20'
                            }`}
                            title="Click to toggle Published/Draft"
                          >
                            {cert.published ? 'Published' : 'Draft'}
                          </button>
                          <button 
                            type="button"
                            onClick={() => openEditModal(cert)}
                            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary transition-all cursor-pointer"
                            title="Edit certificate details"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => setDeleteConfirmCert(cert)}
                            className="rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all cursor-pointer"
                            title="Delete certificate"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : null}
                    </div>

                    {/* Thumbnail / Preview Box */}
                    <div 
                      onClick={() => setPreviewCert(cert)}
                      className="mt-4 flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary/40 transition-colors group-hover:bg-secondary/70 relative"
                      title="Click to view full certificate"
                    >
                      {cert.fileType === "image" ? (
                        <img 
                          src={cert.fileURL || cert.fileUrl} 
                          alt={cert.title} 
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy" 
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                          <Award size={38} className="text-primary" />
                          <span className="text-[11px] font-medium">Click to Preview PDF Document</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="rounded-full bg-card/95 px-3 py-1 text-[11px] font-semibold text-primary shadow-xs flex items-center gap-1.5">
                          <Eye size={13} /> View Full
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <h3 className="mt-4 font-display text-xl font-medium leading-snug group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>

                    <div className="mt-2.5 space-y-1.5 text-xs text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Building2 size={13} className="text-primary" />
                        <span className="font-medium text-foreground">{cert.issuer}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar size={13} className="text-primary" />
                        <span>{cert.issueDate}</span>
                      </p>
                    </div>

                    {cert.description && (
                      <p className="mt-3 text-xs text-muted-foreground/90 line-clamp-2">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  {/* Public Viewer Actions */}
                  <div className="mt-6 flex items-center gap-2 pt-4 border-t border-border">
                    <Button 
                      variant="portfolio" 
                      size="sm" 
                      className="flex-1 text-xs gap-1.5 cursor-pointer neon-glow-btn"
                      onClick={() => setPreviewCert(cert)}
                    >
                      <Eye size={13} /> View Certificate
                    </Button>
                    <Button 
                      variant="portfolioOutline" 
                      size="sm" 
                      asChild 
                      className="text-xs gap-1.5 cursor-pointer glass-panel"
                    >
                      <a 
                        href={cert.fileURL || cert.fileUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        download={`${cert.title}.${cert.fileType}`}
                      >
                        <Download size={13} /> Download
                      </a>
                    </Button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {/* Certificate Preview Modal (Accessible by everyone) */}
        {previewCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-card p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-display text-2xl font-medium">{previewCert.title}</h3>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">
                    Issued by {previewCert.issuer} · {previewCert.issueDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
                    <a href={previewCert.fileURL || previewCert.fileUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={13} /> Open Original
                    </a>
                  </Button>
                  <Button 
                    variant="portfolio" 
                    size="sm" 
                    asChild 
                    className="gap-1.5 text-xs neon-glow-btn"
                  >
                    <a 
                      href={previewCert.fileURL || previewCert.fileUrl} 
                      download={`${previewCert.title}.${previewCert.fileType}`}
                    >
                      <Download size={13} /> Download
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setPreviewCert(null)} className="cursor-pointer">
                    <X size={18} />
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex-1 overflow-auto rounded-xl border border-border bg-secondary/30 min-h-[400px] flex items-center justify-center p-2">
                {previewCert.fileType === "image" ? (
                  <img 
                    src={previewCert.fileURL || previewCert.fileUrl} 
                    alt={previewCert.title} 
                    className="max-h-[72vh] w-auto object-contain mx-auto rounded-lg shadow-sm" 
                  />
                ) : (
                  <iframe 
                    src={previewCert.fileURL || previewCert.fileUrl} 
                    title={previewCert.title} 
                    className="h-[72vh] w-full rounded-xl"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Single-Admin Login Modal (Restricted to tharshnitharshni28@gmail.com) */}
        {showAdminLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-7 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Lock size={18} />
                  <span>Authorized Admin Portal</span>
                </div>
                <button 
                  onClick={() => setShowAdminLogin(false)} 
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Single-administrator access restricted to the portfolio owner (<strong>{ADMIN_EMAIL}</strong>). Public registration is disabled.
              </p>

              {loginError && (
                <div className="mt-4 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive flex items-start gap-2">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              {resetSentMessage && (
                <div className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-600 flex items-start gap-2">
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
                  <span>{resetSentMessage}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium mb-1">Administrator Email</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-mono focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder={ADMIN_EMAIL}
                  />
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">
                    Authorized admin: {ADMIN_EMAIL}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Firebase Password</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your Firebase admin password"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loginLoading} 
                  variant="portfolio" 
                  className="w-full text-xs cursor-pointer mt-2 neon-glow-btn"
                >
                  {loginLoading ? <Loader2 size={14} className="animate-spin" /> : "Sign In to Admin Portal"}
                </Button>

                {/* Password Setup / Reset Button */}
                <div className="pt-3 border-t border-border/80 text-center">
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    disabled={resetLoading}
                    className="text-[11px] text-primary hover:underline cursor-pointer inline-flex items-center gap-1 font-medium"
                  >
                    <KeyRound size={12} /> {resetLoading ? "Sending email..." : "First time or forgot password? Send reset link"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Upload / Edit Certificate Modal (Admin Only) */}
        {showUploadModal && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2 font-display text-2xl font-medium">
                  <Award size={22} className="text-primary" />
                  <span>{editingCert ? "Edit Certificate" : "Upload New Certificate"}</span>
                </div>
                <button 
                  onClick={() => setShowUploadModal(false)} 
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {formError && (
                <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive">
                  {formError}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                {!editingCert && (
                  <div>
                    <label className="block text-xs font-medium mb-1.5">Certificate File (PDF, JPG, PNG - Max 10MB)</label>
                    <input
                      type="file"
                      required
                      accept=".pdf,image/png,image/jpeg,image/webp"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {selectedFile && (
                      <p className="mt-1 text-[11px] text-primary font-medium">
                        Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium mb-1">Certificate Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Python for Data Science / Full Stack Web Development"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium mb-1">Issuing Organization *</label>
                    <input
                      type="text"
                      required
                      value={formIssuer}
                      onChange={(e) => setFormIssuer(e.target.value)}
                      placeholder="e.g. NPTEL / Coursera / HackerRank"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Issue Date *</label>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Description (Optional)</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Brief description or skills covered..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="publishedCheck"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="publishedCheck" className="text-xs font-medium cursor-pointer">
                    Publish certificate immediately for public visitors
                  </label>
                </div>

                {uploadProgress !== null && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Uploading to Firebase Storage & Firestore...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowUploadModal(false)}
                    className="cursor-pointer text-xs"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    variant="portfolio" 
                    size="sm" 
                    className="cursor-pointer text-xs gap-1.5 neon-glow-btn"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={14} className="animate-spin" /> Saving...</>
                    ) : (
                      <><Check size={14} /> {editingCert ? "Update Certificate" : "Upload Certificate"}</>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Manage Certificates Drawer / Modal (Admin Only) */}
        {showManageDrawer && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-2xl max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={20} className="text-primary" />
                  <h3 className="font-display text-2xl font-medium">Manage Certificates</h3>
                  <span className="text-xs text-muted-foreground font-mono">({certificates.length} items)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={openNewModal} variant="portfolio" size="sm" className="text-xs gap-1 neon-glow-btn">
                    <Plus size={14} /> Add New
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setShowManageDrawer(false)} className="cursor-pointer">
                    <X size={18} />
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex-1 overflow-y-auto">
                {certificates.length === 0 ? (
                  <p className="text-center py-12 text-xs text-muted-foreground">
                    No certificates in database. Click "Add New" to upload your first certificate.
                  </p>
                ) : (
                  <div className="divide-y divide-border">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="py-3.5 flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm text-foreground truncate">{cert.title}</h4>
                            <button
                              type="button"
                              onClick={() => handleTogglePublish(cert)}
                              className={`text-[10px] rounded-full px-2 py-0.5 font-semibold cursor-pointer border ${
                                cert.published 
                                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' 
                                  : 'bg-amber-500/10 border-amber-500/20 text-amber-600'
                              }`}
                            >
                              {cert.published ? 'Published' : 'Draft'}
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {cert.issuer} · {cert.issueDate} · {cert.fileType.toUpperCase()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setPreviewCert(cert)} 
                            className="text-xs gap-1 cursor-pointer"
                          >
                            <Eye size={12} /> Preview
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setShowManageDrawer(false);
                              openEditModal(cert);
                            }} 
                            className="text-xs gap-1 cursor-pointer text-primary"
                          >
                            <Edit3 size={12} /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setDeleteConfirmCert(cert)} 
                            className="text-xs gap-1 cursor-pointer text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 size={12} /> Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal (Admin Only) */}
        {deleteConfirmCert && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-6 shadow-2xl">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle size={22} />
                <h3 className="font-display text-xl font-semibold">Delete Certificate?</h3>
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Are you sure you want to delete <strong>"{deleteConfirmCert.title}"</strong>? This will permanently remove the certificate record from Cloud Firestore and its file from Firebase Storage.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={isDeleting}
                  onClick={() => setDeleteConfirmCert(null)}
                  className="cursor-pointer text-xs"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  disabled={isDeleting}
                  onClick={confirmDelete}
                  className="cursor-pointer text-xs gap-1.5"
                >
                  {isDeleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                  <span>Confirm Delete</span>
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
