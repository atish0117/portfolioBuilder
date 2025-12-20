import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { portfolioAPI } from '../../services/api'

const initialState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchPortfolio = createAsyncThunk(
  'portfolio/fetchPortfolio',
  async (username, { rejectWithValue }) => {
    try {
      const response = await portfolioAPI.getPortfolio(username)
      console.log('Fetched portfolio:', response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch portfolio')
    }
  }
)

export const updateSectionOrder = createAsyncThunk(
  'portfolio/updateSectionOrder',
  async (sectionOrder, { rejectWithValue }) => {
    try {
      const response = await portfolioAPI.updateSectionOrder(sectionOrder)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update section order')
    }
  }
)

export const toggleSectionVisibility = createAsyncThunk(
  'portfolio/toggleSectionVisibility',
  async ({ section, visible }, { rejectWithValue }) => {
    try {
      const response = await portfolioAPI.toggleSectionVisibility(section, visible)
      return { section, visible, ...response.data }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle section visibility')
    }
  }
)

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clearPortfolio: (state) => {
      state.data = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateSectionOrder.fulfilled, (state, action) => {
        if (state.data) {
          state.data.user.sectionOrder = action.payload.sectionOrder
        }
      })
      .addCase(toggleSectionVisibility.fulfilled, (state, action) => {
        if (state.data) {
          state.data.user.visibleSections = action.payload.visibleSections
        }
      })
  },
})

export const { clearPortfolio } = portfolioSlice.actions
export default portfolioSlice.reducer
