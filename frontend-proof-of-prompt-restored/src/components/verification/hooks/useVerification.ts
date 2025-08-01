import { useState } from 'react';
import { verifyProof } from '@/utils/api';

interface BlockchainData {
  tx_hash: string;
  block_number: number;
  chain_id: number;
  explorer_url?: string;
  timestamp?: string;
}

interface VerificationResult {
  verified: boolean;
  hash?: string;
  error?: string;
  blockchain?: BlockchainData;
  prompt?: string;
  response?: string;
  local_hash?: string;
  timestamp?: string;
}

interface VerificationState {
  result: VerificationResult | null;
  loading: boolean;
  error: string | null;
}

export default function useVerification() {
  const [state, setState] = useState<VerificationState>({
    result: null,
    loading: false,
    error: null
  });

  const verify = async (data: { prompt: string; response: string } | { tx_hash: string }) => {
    setState(prev => ({
      ...prev,
      result: null,
      loading: true,
      error: null
    }));

    try {
      const result = await verifyProof(data);
      setState({
        result,
        loading: false,
        error: null
      });
      return result; // Return the result for optional chaining
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Verification failed';
      setState({
        result: null,
        loading: false,
        error
      });
      throw err; // Re-throw for additional error handling
    }
  };

  const reset = () => {
    setState({
      result: null,
      loading: false,
      error: null
    });
  };

  return {
    verify,
    reset,
    ...state,
    isVerified: state.result?.verified ?? false
  };
}