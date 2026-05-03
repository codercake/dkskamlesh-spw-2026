import { useState, useRef, useCallback } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useToast } from '../components/Toast';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILES } from '../data/constants';
import './Upload.css';

export default function Upload() {
  const [mode, setMode] = useState('local'); // 'local' | 'drive'
  const [files, setFiles] = useState([]);
  const [driveLink, setDriveLink] = useState('');
  const [driveError, setDriveError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { addToast } = useToast();

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const validateFile = (file) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return `"${file.name}" — unsupported format. Use JPEG, PNG, or WEBP.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `"${file.name}" exceeds 10MB limit (${formatSize(file.size)}).`;
    }
    return null;
  };

  const addFiles = useCallback((newFiles) => {
    const remaining = MAX_FILES - files.length;
    if (remaining <= 0) {
      addToast(`Maximum ${MAX_FILES} files allowed.`, 'warning');
      return;
    }

    const filesToAdd = Array.from(newFiles).slice(0, remaining);
    const validFiles = [];

    filesToAdd.forEach(file => {
      const error = validateFile(file);
      if (error) {
        addToast(error, 'error');
      } else {
        // Check for duplicates
        const isDuplicate = files.some(f => f.file.name === file.name && f.file.size === file.size);
        if (isDuplicate) {
          addToast(`"${file.name}" is already added.`, 'warning');
        } else {
          validFiles.push({
            file,
            preview: URL.createObjectURL(file),
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          });
        }
      }
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      addToast(`${validFiles.length} photo${validFiles.length > 1 ? 's' : ''} added.`, 'success');
    }
  }, [files, addToast]);

  const removeFile = (id) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      addFiles(e.dataTransfer.files);
    }
  }, [addFiles]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const validateDriveLink = (url) => {
    if (!url.trim()) return 'Please enter a Google Drive link.';
    const drivePatterns = [
      /^https?:\/\/(drive\.google\.com)/,
      /^https?:\/\/(docs\.google\.com)/,
    ];
    if (!drivePatterns.some(p => p.test(url))) {
      return 'Please enter a valid Google Drive link (drive.google.com).';
    }
    return '';
  };

  const handleDriveLinkChange = (e) => {
    setDriveLink(e.target.value);
    if (driveError) setDriveError('');
  };

  const handleSubmit = async () => {
    if (mode === 'drive') {
      const error = validateDriveLink(driveLink);
      if (error) {
        setDriveError(error);
        return;
      }
    } else if (files.length === 0) {
      addToast('Please add at least one photo to upload.', 'warning');
      return;
    }

    setUploading(true);

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));

    setUploading(false);
    setUploadComplete(true);
    addToast('Photos uploaded successfully! 🎉', 'success');
  };

  const resetUpload = () => {
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
    setDriveLink('');
    setDriveError('');
    setUploadComplete(false);
  };

  if (uploadComplete) {
    return (
      <section className="upload section" id="upload">
        <div className="container">
          <div className="upload__success">
            <div className="upload__success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="upload__success-title">Photos Submitted!</h3>
            <p className="upload__success-text">
              Thank you for sharing your photowalk moments. DK Kamlesh will review and add them to the community album.
            </p>
            <button className="btn btn-secondary" onClick={resetUpload}>
              Upload More Photos
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="upload section" id="upload">
      <div className="container">
        <SectionHeader
          title="Share Your Shots"
          subtitle="Captured something beautiful on a photowalk? Share it with the community — upload from your computer or link from Google Drive."
        />

        {/* Mode toggle */}
        <div className="upload__tabs" role="tablist" id="upload-mode-tabs">
          <button
            className={`upload__tab ${mode === 'local' ? 'upload__tab--active' : ''}`}
            onClick={() => setMode('local')}
            role="tab"
            aria-selected={mode === 'local'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            From Computer
          </button>
          <button
            className={`upload__tab ${mode === 'drive' ? 'upload__tab--active' : ''}`}
            onClick={() => setMode('drive')}
            role="tab"
            aria-selected={mode === 'drive'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            Google Drive Link
          </button>
        </div>

        <div className="upload__content">
          {mode === 'local' ? (
            <>
              {/* Drag & drop zone */}
              <div
                className={`upload__dropzone ${dragOver ? 'upload__dropzone--active' : ''} ${files.length > 0 ? 'upload__dropzone--has-files' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                id="upload-dropzone"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.target.value = '';
                  }}
                  className="sr-only"
                  id="file-input"
                />

                <div className="upload__dropzone-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <p className="upload__dropzone-text">
                  <strong>Drop photos here</strong> or click to browse
                </p>
                <p className="upload__dropzone-hint">
                  JPEG, PNG, WEBP • Max 10MB each • Up to {MAX_FILES} files
                </p>
              </div>

              {/* Preview grid */}
              {files.length > 0 && (
                <div className="upload__previews">
                  <div className="upload__previews-header">
                    <span className="upload__previews-count">
                      {files.length} / {MAX_FILES} photos
                    </span>
                    <button
                      className="upload__clear-all"
                      onClick={() => {
                        files.forEach(f => URL.revokeObjectURL(f.preview));
                        setFiles([]);
                      }}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="upload__previews-grid">
                    {files.map(f => (
                      <div key={f.id} className="upload__preview">
                        <img src={f.preview} alt={f.file.name} />
                        <div className="upload__preview-overlay">
                          <span className="upload__preview-name">{f.file.name}</span>
                          <span className="upload__preview-size">{formatSize(f.file.size)}</span>
                        </div>
                        <button
                          className="upload__preview-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(f.id);
                          }}
                          aria-label={`Remove ${f.file.name}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Google Drive link input */
            <div className="upload__drive">
              <div className="upload__drive-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                </svg>
              </div>
              <p className="upload__drive-text">
                Paste your Google Drive folder or file link below
              </p>
              <div className="form-group" style={{ width: '100%', maxWidth: '500px' }}>
                <input
                  type="url"
                  className={`form-input ${driveError ? 'error' : ''}`}
                  placeholder="https://drive.google.com/..."
                  value={driveLink}
                  onChange={handleDriveLinkChange}
                  id="drive-link-input"
                />
                {driveError && (
                  <span className="form-error">{driveError}</span>
                )}
              </div>
              <p className="upload__drive-hint">
                Make sure the link is set to "Anyone with the link can view"
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="upload__actions">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={uploading || (mode === 'local' && files.length === 0) || (mode === 'drive' && !driveLink.trim())}
              id="upload-submit-btn"
            >
              {uploading ? (
                <>
                  <span className="upload__spinner" />
                  Uploading...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Submit Photos
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
