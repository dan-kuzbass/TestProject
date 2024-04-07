import React, { useEffect, useState } from 'react'

export default function useFormField() {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  return { value, setValue, error, setError }
}
