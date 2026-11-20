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
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Certificate, 
  getCertificates, 
  addCertificate, 
  updateCertificate, 
  deleteCertificate 
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
  
  // Modals & Panels
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formIssuer, setFormIssuer] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Certificates
  const loadData = async () => {
    setLoading(true);
    const data = await getCertificates();
    setCertificates(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Open Upload Modal
  const openNewModal = () => {
    setEditingCert(null);
    setFormTitle("");
    setFormIssuer("");
    setFormDate(new Date().toISOString().slice(0, 10));
    setFormDesc("");
    setSelectedFile(null);
    setUploadProgress(null);
    setFormError(null);
    setShowUploadModal(true);
  };

  // Open Edit Modal
  const openEditModal = (cert: Certificate) => {
    setEditingCert(cert);
    setFormTitle(cert.title);
    setFormIssuer(cert.issuer);
    setFormDate(cert.issueDate);
    setFormDesc(cert.description || "");
    setSelectedFile(null);
    setUploadProgress(null);
    setFormError(null);
    setShowUploadModal(true);
  };

  // Save / Upload Certificate
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formTitle || !formIssuer || !formDate) {
      setFormError("Please fill in Title, Issuer and Issue Date.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingCert) {
        // Updating existing certificate metadata
        await updateCertificate(editingCert.id, {
          title: formTitle,
          issuer: formIssuer,
          issueDate: formDate,
          description: formDesc,
        });
      } else {
        // Uploading new certificate
        if (!selectedFile) {
          setFormError("Please select a certificate file (PDF, JPG, PNG).");
          setIsSubmitting(false);
          return;
        }

        await addCertificate(
          selectedFile,
          {
            title: formTitle,
            issuer: formIssuer,
            issueDate: formDate,
            description: formDesc,
          },
          (progress) => setUploadProgress(progress)
        );
      }

      setShowUploadModal(false);
      await loadData();
    } catch (err: any) {
      setFormError(err.message || "Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  // Delete Certificate
  const handleDelete = async (cert: Certificate) => {
    if (!window.confirm(`Are you sure you want to delete "${cert.title}"?`)) return;
    try {
      await deleteCertificate(cert.id, cert.storagePath);
      await loadData();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const displayedCerts = preview ? certificates.slice(0, 3) : certificates;

  return (
    <section className="section bg-card">
      <div className="page-width">
        {/* Controls Bar */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          {!hideHeading ? (
            <div>
              <div className="eyebrow">Recognitions & Learning</div>
              <h2 className="section-title">My Certificates.</h2>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground">
                Verified certificates, technical courses, and academic achievements.
              </p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button 
              onClick={openNewModal}
              variant="portfolio" 
              size="default" 
              className="cursor-pointer gap-2 shadow-xs transition-transform hover:-translate-y-0.5"
            >
              <Plus size={16} /> Upload Certificate
            </Button>
            {preview && (
              <Button asChild variant="portfolioOutline" size="default">
                <Link to="/certificates" className="gap-1.5">
                  View All Certificates <ArrowUpRight size={14} />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="animate-spin text-primary" size={28} />
            <p className="mt-3 text-xs">Loading certificates...</p>
          </div>
        ) : displayedCerts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/30 p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Award size={28} />
            </div>
            <h3 className="mt-4 font-display text-2xl font-medium">No certificates uploaded yet</h3>
            <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
              Click the "Upload Certificate" button above to add your first certificate (PDF or Image). Everyone visiting will be able to view and download it!
            </p>
            <Button onClick={openNewModal} variant="portfolio" size="sm" className="mt-6 gap-2 cursor-pointer">
              <Plus size={15} /> Upload First Certificate
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedCerts.map((cert) => (
              <TiltCard key={cert.id} className="rounded-2xl">
                <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-lg h-full">
                  <div>
                    {/* Top Badge & Management */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-medium text-primary">
                        {cert.fileType === "pdf" ? <FileText size={13} /> : <ImageIcon size={13} />}
                        {cert.fileType.toUpperCase()}
                      </span>

                      <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditModal(cert)}
                          className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary transition-all cursor-pointer"
                          title="Edit certificate details"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cert)}
                          className="rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all cursor-pointer"
                          title="Delete certificate"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Thumbnail / Preview Box */}
                    <div 
                      onClick={() => setPreviewCert(cert)}
                      className="mt-4 flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary/40 transition-colors group-hover:bg-secondary/70 relative"
                      title="Click to preview certificate"
                    >
                      {cert.fileType === "image" ? (
                        <img 
                          src={cert.fileUrl} 
                          alt={cert.title} 
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy" 
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                          <Award size={38} className="text-primary" />
                          <span className="text-[11px] font-medium">Click to Preview PDF</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="rounded-full bg-card/95 px-3 py-1 text-[11px] font-medium text-primary shadow-xs flex items-center gap-1.5">
                          <Eye size={13} /> Click to View
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
                        <span>{cert.issuer}</span>
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

                  {/* Bottom Actions for public */}
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
                      className="text-xs gap-1.5 cursor-pointer"
                    >
                      <a href={cert.fileUrl} target="_blank" rel="noreferrer" download={`${cert.title}.${cert.fileType}`}>
                        <Download size={13} /> Download
                      </a>
                    </Button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {/* Certificate Preview Modal */}
        {previewCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-border bg-card p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-display text-2xl font-medium">{previewCert.title}</h3>
                  <p className="text-xs text-muted-foreground">Issued by {previewCert.issuer} · {previewCert.issueDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
                    <a href={previewCert.fileUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={13} /> Open in New Tab
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setPreviewCert(null)} className="cursor-pointer">
                    <X size={18} />
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex-1 overflow-auto rounded-xl border border-border bg-secondary/30 min-h-[350px] flex items-center justify-center p-2">
                {previewCert.fileType === "image" ? (
                  <img src={previewCert.fileUrl} alt={previewCert.title} className="max-h-[70vh] w-auto object-contain mx-auto rounded-lg shadow-sm" />
                ) : (
                  <iframe 
                    src={previewCert.fileUrl} 
                    title={previewCert.title} 
                    className="h-[70vh] w-full rounded-xl"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Upload / Edit Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
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
                    <label className="block text-xs font-medium mb-1.5">Certificate File (PDF, JPG, PNG)</label>
                    <input
                      type="file"
                      required
                      accept=".pdf,image/png,image/jpeg,image/webp"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {selectedFile && (
                      <p className="mt-1 text-[11px] text-primary">Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium mb-1">Certificate Title</label>
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
                    <label className="block text-xs font-medium mb-1">Issuing Organization</label>
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
                    <label className="block text-xs font-medium mb-1">Issue Date</label>
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

                {uploadProgress !== null && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Uploading to Firebase...</span>
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
                    className="cursor-pointer text-xs gap-1.5"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={14} className="animate-spin" /> Uploading...</>
                    ) : (
                      <><Check size={14} /> {editingCert ? "Update Certificate" : "Upload Certificate"}</>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
