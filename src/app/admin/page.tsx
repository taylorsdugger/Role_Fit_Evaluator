"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Stack,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import EditIcon from "@mui/icons-material/Edit";

interface BulletRewrite {
  original: string;
  suggested: string;
  reason: string;
}

interface MatchResult {
  score: number;
  keyword_match: {
    matched: string[];
    missing: string[];
  };
  resume_edits: {
    additions: string[];
    improvements: string[];
  };
  bullet_rewrites: BulletRewrite[];
  summary: string;
}

const MODELS = [
  { value: "google/gemini-2.5-flash-lite", label: "Gemini 2.5 Lite", description: "Fast, experimental, almost free" },
  { value: "anthropic/claude-3.5-haiku", label: "Claude 3.5 Haiku", description: "Balanced, affordable (~$0.001)" },
  { value: "openai/gpt-4o-mini", label: "GPT-4o Mini", description: "Reliable, mid-tier (~$0.0015)" },
  { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet", description: "Best reasoning, premium (~$0.015)" },
];

export default function AdminPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [model, setModel] = useState(MODELS[1].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/admin-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          resume,
          model,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze match");
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "success.main";
    if (score >= 60) return "warning.main";
    return "error.main";
  };

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Admin: ATS Resume Matcher
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload a job description and your resume to analyze keyword match, scoring, and get suggestions for improvements.
      </Typography>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              select
              label="AI Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              fullWidth
              helperText="Select model based on quality/cost tradeoff"
            >
              {MODELS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Job Description"
              multiline
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              fullWidth
              placeholder="Paste the full job description here..."
            />

            <TextField
              label="Your Resume"
              multiline
              rows={12}
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              required
              fullWidth
              placeholder="Paste your full resume text here..."
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || !jobDescription || !resume}
              sx={{ alignSelf: "flex-start" }}
            >
              {loading ? <CircularProgress size={24} /> : "Analyze Match"}
            </Button>
          </Stack>
        </form>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Box>
          {/* Score Card */}
          <Card sx={{ mb: 4, bgcolor: "background.paper" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Match Score
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{ color: getScoreColor(result.score), fontWeight: "bold" }}
                >
                  {result.score}%
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {result.summary}
              </Typography>
            </CardContent>
          </Card>

          {/* Keyword Match */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleIcon color="success" />
                Keyword Analysis
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Matched Keywords ({result.keyword_match.matched.length})
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {result.keyword_match.matched.map((keyword, idx) => (
                    <Chip key={idx} label={keyword} color="success" variant="outlined" />
                  ))}
                </Box>
              </Box>

              {result.keyword_match.missing.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Missing Keywords ({result.keyword_match.missing.length})
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {result.keyword_match.missing.map((keyword, idx) => (
                      <Chip key={idx} label={keyword} color="error" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Resume Edits */}
          {(result.resume_edits.additions.length > 0 || result.resume_edits.improvements.length > 0) && (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <WarningIcon color="warning" />
                  Suggested Resume Edits
                </Typography>

                {result.resume_edits.additions.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Skills/Experience to Add
                    </Typography>
                    <List>
                      {result.resume_edits.additions.map((addition, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemText primary={`• ${addition}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {result.resume_edits.improvements.length > 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Areas to Improve
                    </Typography>
                    <List>
                      {result.resume_edits.improvements.map((improvement, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemText primary={`• ${improvement}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}

          {/* Bullet Rewrites */}
          {result.bullet_rewrites.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EditIcon color="primary" />
                  Bullet Point Rewrites
                </Typography>
                <Stack spacing={3} divider={<Divider />}>
                  {result.bullet_rewrites.map((rewrite, idx) => (
                    <Box key={idx}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Original:
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2, fontStyle: "italic" }}>
                        {rewrite.original}
                      </Typography>

                      <Typography variant="subtitle2" color="success.main" gutterBottom>
                        Suggested:
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                        {rewrite.suggested}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Reason: {rewrite.reason}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
    </Container>
  );
}
