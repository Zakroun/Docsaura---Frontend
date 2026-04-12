import { useState, useMemo, useCallback } from 'react';

export function useSearch(items, searchFields = [], filterField = null) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    return items.filter(item => {
      const matchesQuery = !query.trim() || searchFields.some(field => {
        const val = field.split('.').reduce((obj, key) => obj?.[key], item);
        return String(val || '').toLowerCase().includes(query.toLowerCase());
      });
      const matchesFilter = activeFilter === 'All' || !filterField ||
        String(item[filterField] || '').toLowerCase().includes(activeFilter.toLowerCase());
      return matchesQuery && matchesFilter;
    });
  }, [items, query, activeFilter, searchFields, filterField]);

  const handleFilter = useCallback((filter) => setActiveFilter(filter), []);
  const handleQuery = useCallback((e) => setQuery(e.target.value), []);

  return { query, activeFilter, filtered, handleQuery, handleFilter, setQuery };
}
