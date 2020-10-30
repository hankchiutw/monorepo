import { useContext } from 'react';
import { PaperProjectContext } from './paper-project-context';

export function usePaperProject() {
  return useContext(PaperProjectContext);
}
