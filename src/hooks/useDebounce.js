import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useDebounce Hook
 * 
 * Delays updating a value until after a specified delay has passed.
 * Useful for search inputs, API calls, and expensive operations.
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @param {Object} options - Additional options
 * @param {boolean} options.leading - Execute on leading edge
 * @param {boolean} options.trailing - Execute on trailing edge
 * @param {number} options.maxWait - Maximum wait time before forcing execution
 * @returns {any} The debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   // This will only run after 300ms of no typing
 *   console.log('Searching for:', debouncedSearch);
 * }, [debouncedSearch]);
 */
function useDebounce(value, delay = 500, options = {}) {
  const { leading = false, trailing = true, maxWait } = options;
  
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isPending, setIsPending] = useState(false);
  
  const timeoutRef = useRef(null);
  const maxTimeoutRef = useRef(null);
  const lastCallTimeRef = useRef(null);
  const lastValueRef = useRef(value);

  // Clear all timeouts
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
  }, []);

  // Update debounced value immediately (leading edge)
  const updateImmediately = useCallback((newValue) => {
    setDebouncedValue(newValue);
    setIsPending(false);
    lastValueRef.current = newValue;
    clearTimeouts();
  }, [clearTimeouts]);

  useEffect(() => {
    const currentValue = value;
    const now = Date.now();
    
    // Update last call time
    lastCallTimeRef.current = now;

    // If leading is true and no pending update, execute immediately
    if (leading && !isPending && debouncedValue !== currentValue) {
      updateImmediately(currentValue);
      return;
    }

    // If value hasn't changed, don't do anything
    if (lastValueRef.current === currentValue) {
      return;
    }

    // Set pending state
    setIsPending(true);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set up the main timeout
    timeoutRef.current = setTimeout(() => {
      // Only update if value hasn't changed since timeout was set
      if (value === currentValue) {
        updateImmediately(currentValue);
      }
    }, delay);

    // Set up maxWait timeout if specified
    if (maxWait && !maxTimeoutRef.current) {
      maxTimeoutRef.current = setTimeout(() => {
        // Force update with current value
        updateImmediately(currentValue);
      }, maxWait);
    }

    // Cleanup timeout on unmount or value change
    return () => {
      clearTimeouts();
    };
  }, [value, delay, leading, maxWait, isPending, debouncedValue, updateImmediately, clearTimeouts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  // Return the debounced value, a cancel function, and pending state
  return {
    value: debouncedValue,
    isPending,
    cancel: clearTimeouts,
    flush: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (lastValueRef.current !== debouncedValue) {
        updateImmediately(lastValueRef.current);
      }
    },
  };
}

/**
 * useDebouncedCallback Hook
 * 
 * Debounces a callback function instead of a value.
 * Useful for handling events directly.
 * 
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {Array} deps - Dependencies array
 * @returns {Function} Debounced callback
 * 
 * @example
 * const handleSearch = useDebouncedCallback((term) => {
 *   console.log('Searching:', term);
 * }, 300);
 * 
 * <input onChange={(e) => handleSearch(e.target.value)} />
 */
export function useDebouncedCallback(callback, delay = 500, deps = []) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay, ...deps]
  );
}

/**
 * useDebouncedValue Hook (Simplified version)
 * 
 * A simpler version that just returns the debounced value.
 * 
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} Debounced value
 * 
 * @example
 * const debouncedValue = useDebouncedValue(searchTerm, 300);
 */
export function useDebouncedValue(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useThrottle Hook
 * 
 * Throttles a value to update at most once per interval.
 * Similar to debounce but guarantees updates at a certain rate.
 * 
 * @param {any} value - Value to throttle
 * @param {number} interval - Interval in milliseconds
 * @returns {any} Throttled value
 * 
 * @example
 * const throttledValue = useThrottle(scrollPosition, 100);
 */
export function useThrottle(value, interval = 500) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutionTime = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecutionTime.current;

    // If enough time has passed, update immediately
    if (timeSinceLastExecution >= interval) {
      setThrottledValue(value);
      lastExecutionTime.current = now;
    } else {
      // Schedule update for later
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value);
        lastExecutionTime.current = Date.now();
      }, interval - timeSinceLastExecution);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, interval]);

  return throttledValue;
}

/**
 * useDebouncedSearch Hook
 * 
 * Specialized hook for search inputs with loading states.
 * 
 * @param {Function} searchFunction - Function to execute search
 * @param {number} delay - Debounce delay in milliseconds
 * @param {Array} deps - Dependencies array
 * @returns {Object} Search state and handlers
 * 
 * @example
 * const { query, results, loading, handleSearch } = useDebouncedSearch(
 *   (term) => fetchEvents(term),
 *   300
 * );
 */
export function useDebouncedSearch(searchFunction, delay = 500, deps = []) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  // Debounced search execution
  const debouncedSearch = useCallback(
    async (searchQuery) => {
      if (!searchQuery || searchQuery.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await searchFunction(searchQuery);
        setResults(data);
      } catch (err) {
        setError(err.message || 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [searchFunction, ...deps]
  );

  // Handle query change with debounce
  const handleSearch = useCallback(
    (value) => {
      setQuery(value);

      // Clear existing timeout
      if (searchRef.current) {
        clearTimeout(searchRef.current);
      }

      // Set new timeout for search
      searchRef.current = setTimeout(() => {
        debouncedSearch(value);
      }, delay);
    },
    [delay, debouncedSearch]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchRef.current) {
        clearTimeout(searchRef.current);
      }
    };
  }, []);

  // Reset search
  const resetSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setLoading(false);
    setError(null);
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
  }, []);

  return {
    query,
    results,
    loading,
    error,
    handleSearch,
    resetSearch,
    setQuery,
  };
}

export default useDebounce;