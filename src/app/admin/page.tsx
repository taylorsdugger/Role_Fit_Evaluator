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
import AssessmentIcon from "@mui/icons-material/Assessment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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

interface ScoreBreakdown {
  earned: number;
  possible: number;
}

interface ImprovementStep {
  priority: number;
  step: string;
  potential_increase: string;
}

interface ResumeCheckResult {
  overall_score: number;
  score_breakdown: {
    impact_outcomes: ScoreBreakdown;
    role_clarity: ScoreBreakdown;
    bullet_quality: ScoreBreakdown;
    summary_strength: ScoreBreakdown;
    structure_readability: ScoreBreakdown;
    relevance: ScoreBreakdown;
    red_flags_penalty: ScoreBreakdown;
  };
  why_this_score: string;
  what_you_did_well: string[];
  issues_lowering_score: string[];
  steps_to_improve: ImprovementStep[];
  red_flags: string[];
}

interface ATSCheckResult {
  ats_score: number;
  score_breakdown: {
    keyword_match: ScoreBreakdown;
    experience_alignment: ScoreBreakdown;
    structure_compliance: ScoreBreakdown;
    parsing_readability: ScoreBreakdown;
    skills_section: ScoreBreakdown;
    keyword_gaps: ScoreBreakdown;
  };
  why_this_score: string;
  ats_issues: string[];
  keywords_found: string[];
  keywords_missing: string[];
  ats_optimization_steps: ImprovementStep[];
}

const EVALUATION_TYPES = [
  { 
    value: "hiring_manager", 
    label: "Hiring Manager Quality Score",
    description: "Evaluates leadership, impact, bullet quality, and overall presentation from a human hiring perspective."
  },
  { 
    value: "ats", 
    label: "ATS Readiness Score",
    description: "A low ATS score does not imply a weak candidate — it reflects keyword and formatting alignment only."
  },
];

const MODELS = [
  { value: "google/gemini-2.5-flash-lite", label: "Gemini 2.5 Lite", description: "Fast, experimental, almost free" },
  { value: "anthropic/claude-3.5-haiku", label: "Claude 3.5 Haiku", description: "Balanced, affordable (~$0.001)" },
  { value: "openai/gpt-4o-mini", label: "GPT-4o Mini", description: "Reliable, mid-tier (~$0.0015)" },
  { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet", description: "Best reasoning, premium (~$0.015)" },
];

export default function AdminPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [model, setModel] = useState(MODELS[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);

  // Resume checker state
  const [resumeToCheck, setResumeToCheck] = useState("");
  const [checkModel, setCheckModel] = useState(MODELS[0].value);
  const [evaluationType, setEvaluationType] = useState<"hiring_manager" | "ats">("hiring_manager");
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [checkResult, setCheckResult] = useState<ResumeCheckResult | ATSCheckResult | null>(null);

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

  const handleResumeCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckLoading(true);
    setCheckError(null);
    setCheckResult(null);

    try {
      const response = await fetch("/api/admin-resume-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resumeToCheck,
          model: checkModel,
          evaluationType: evaluationType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to check resume");
      }

      const data = await response.json();
      setCheckResult(data.result);
    } catch (err) {
      setCheckError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setCheckLoading(false);
    }
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

      {/* Divider between sections */}
      <Divider sx={{ my: 8 }} />

      {/* Resume Checker Section */}
      <Typography variant="h3" component="h2" gutterBottom fontWeight="bold" sx={{ mt: 8 }}>
        Resume Checker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Get an objective evaluation of your resume with a numeric score, detailed breakdown, and actionable improvement steps.
      </Typography>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <form onSubmit={handleResumeCheck}>
          <Stack spacing={3}>
            <TextField
              select
              label="Evaluation Type"
              value={evaluationType}
              onChange={(e) => setEvaluationType(e.target.value as "hiring_manager" | "ats")}
              fullWidth
            >
              {EVALUATION_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Description based on selected evaluation type */}
            <Alert severity="info" sx={{ mt: -1 }}>
              {EVALUATION_TYPES.find(t => t.value === evaluationType)?.description}
            </Alert>

            <TextField
              select
              label="AI Model"
              value={checkModel}
              onChange={(e) => setCheckModel(e.target.value)}
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
              label="Your Resume"
              multiline
              rows={15}
              value={resumeToCheck}
              onChange={(e) => setResumeToCheck(e.target.value)}
              required
              fullWidth
              placeholder="Paste your full resume text here..."
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={checkLoading || !resumeToCheck}
              sx={{ alignSelf: "flex-start" }}
            >
              {checkLoading ? <CircularProgress size={24} /> : "Check Resume"}
            </Button>
          </Stack>
        </form>
      </Paper>

      {checkError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {checkError}
        </Alert>
      )}

      {checkResult && (
        <Box>
          {/* Overall Score Card */}
          <Card sx={{ mb: 4, bgcolor: "background.paper" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AssessmentIcon color="primary" />
                {evaluationType === "ats" ? "ATS Readiness Score" : "Overall Score"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{ color: getScoreColor("ats_score" in checkResult ? checkResult.ats_score : checkResult.overall_score), fontWeight: "bold" }}
                >
                  {"ats_score" in checkResult ? checkResult.ats_score : checkResult.overall_score}/100
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {checkResult.why_this_score}
              </Typography>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Score Breakdown
              </Typography>
              {"ats_score" in checkResult ? (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Keyword & Skill Match: {checkResult.score_breakdown.keyword_match.earned}/{checkResult.score_breakdown.keyword_match.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Experience Keyword Alignment: {checkResult.score_breakdown.experience_alignment.earned}/{checkResult.score_breakdown.experience_alignment.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Resume Structure Compliance: {checkResult.score_breakdown.structure_compliance.earned}/{checkResult.score_breakdown.structure_compliance.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      ATS Readability & Parsing: {checkResult.score_breakdown.parsing_readability.earned}/{checkResult.score_breakdown.parsing_readability.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Skills Section Quality: {checkResult.score_breakdown.skills_section.earned}/{checkResult.score_breakdown.skills_section.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Keyword Coverage Gaps: {checkResult.score_breakdown.keyword_gaps.earned}/{checkResult.score_breakdown.keyword_gaps.possible}
                    </Typography>
                  </Box>
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Impact & Outcomes: {checkResult.score_breakdown.impact_outcomes.earned}/{checkResult.score_breakdown.impact_outcomes.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Role Clarity & Seniority: {checkResult.score_breakdown.role_clarity.earned}/{checkResult.score_breakdown.role_clarity.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Bullet Quality: {checkResult.score_breakdown.bullet_quality.earned}/{checkResult.score_breakdown.bullet_quality.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Summary Strength: {checkResult.score_breakdown.summary_strength.earned}/{checkResult.score_breakdown.summary_strength.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Structure & Readability: {checkResult.score_breakdown.structure_readability.earned}/{checkResult.score_breakdown.structure_readability.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Relevance to Target Role: {checkResult.score_breakdown.relevance.earned}/{checkResult.score_breakdown.relevance.possible}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Red Flags Penalty: {checkResult.score_breakdown.red_flags_penalty.earned}/{checkResult.score_breakdown.red_flags_penalty.possible}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>

          {/* What You Did Well / Keywords Found for ATS */}
          {"ats_score" in checkResult ? (
            checkResult.keywords_found.length > 0 && (
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon color="success" />
                    Keywords Found
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {checkResult.keywords_found.map((keyword, idx) => (
                      <Chip key={idx} label={keyword} color="success" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )
          ) : (
            checkResult.what_you_did_well.length > 0 && (
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon color="success" />
                    What You Did Well
                  </Typography>
                  <List>
                    {checkResult.what_you_did_well.map((item, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemText primary={`• ${item}`} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )
          )}

          {/* Issues Lowering Score / ATS Issues / Missing Keywords */}
          {"ats_score" in checkResult ? (
            <>
              {checkResult.keywords_missing.length > 0 && (
                <Card sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WarningIcon color="error" />
                      Missing Keywords
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {checkResult.keywords_missing.map((keyword, idx) => (
                        <Chip key={idx} label={keyword} color="error" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              )}
              {checkResult.ats_issues.length > 0 && (
                <Card sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WarningIcon color="warning" />
                      ATS Issues
                    </Typography>
                    <List>
                      {checkResult.ats_issues.map((issue, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemText primary={`• ${issue}`} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            checkResult.issues_lowering_score.length > 0 && (
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WarningIcon color="warning" />
                    Issues Lowering Your Score
                  </Typography>
                  <List>
                    {checkResult.issues_lowering_score.map((item, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemText primary={`• ${item}`} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )
          )}

          {/* Steps to Improve / ATS Optimization Steps */}
          {"ats_score" in checkResult ? (
            checkResult.ats_optimization_steps.length > 0 && (
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TrendingUpIcon color="primary" />
                    ATS Optimization Steps (Ordered by Impact)
                  </Typography>
                  <Stack spacing={2} divider={<Divider />}>
                    {checkResult.ats_optimization_steps.map((step, idx) => (
                      <Box key={idx}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {step.priority}. {step.step}
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          Potential increase: {step.potential_increase}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )
          ) : (
            checkResult.steps_to_improve.length > 0 && (
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TrendingUpIcon color="primary" />
                    Steps to Increase Your Score (Ordered by Impact)
                  </Typography>
                  <Stack spacing={2} divider={<Divider />}>
                    {checkResult.steps_to_improve.map((step, idx) => (
                      <Box key={idx}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {step.priority}. {step.step}
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          Potential increase: {step.potential_increase}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )
          )}

          {/* Red Flags - only for Hiring Manager evaluation */}
          {!("ats_score" in checkResult) && checkResult.red_flags.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <WarningIcon color="error" />
                  Red Flags or Hiring Concerns
                </Typography>
                <List>
                  {checkResult.red_flags.map((flag, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemText primary={`• ${flag}`} sx={{ color: "error.main" }} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
    </Container>
  );
}
