# Data Processing Plan
Target: Lateness (derived)

Features:
- Bus Line
- Stop
- Day of the Week (Derived)
- Time of Day
- Distance to Current Date (Derived)
  - Strong recency bias

Plan:
- Find an efficient manner to calculate derived features, and collect into nice data
- Split Training and Testing and Verification Data based on past stops (we have several thousand+ collected)
- Feature selection and balancing (decisions to be made, but possibly with PCA, some amount of grid search, weighting here will be important)
- Optimize K-NN based strategy, with consensus reached by taking a weighted sample and generating confidence intervals based on that
- Possibly look in to using ML focused techniques if result is not satisfactory