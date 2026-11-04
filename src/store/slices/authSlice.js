
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// CHECK AUTH
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authAPI.getProfile();
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue({
          type: "UNAUTHENTICATED",
        });
      }

      return rejectWithValue({
        type: "SERVER_ERROR",
        message: "Authentication check failed",
      });
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

// UPDATE SKILLS
export const updateSkills = createAsyncThunk(
  "auth/updateSkills",
  async (skills, { rejectWithValue }) => {
    try {
      const res = await authAPI.updateSkills(skills);
      return res.data.skills;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Skill update failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.user;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;

        if (action.payload?.type === "UNAUTHENTICATED") {
          state.user = null;
          state.isAuthenticated = false;
          state.error = null;
        } else {
          // Preserve existing auth state on temporary server errors
          state.error = action.payload?.message || "Authentication check failed";
        }
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        // Clear local auth immediately
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Keep local logout even if server request fails
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user = {
            ...state.user,
            ...action.payload.user,
          };
        } else {
          state.user = action.payload.user;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE SKILLS
      .addCase(updateSkills.fulfilled, (state, action) => {
        if (state.user) {
          state.user.skills = action.payload;
        }
      })
      .addCase(updateSkills.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;