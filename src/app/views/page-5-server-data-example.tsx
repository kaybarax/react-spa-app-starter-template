/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HeaderMenuNavigation } from '../routing-and-navigation/header-menu-navigation';
import { TITLE } from '../app-config';

interface Post {
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export default function Page5ServerDataExample() {
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <React.Fragment>
      <title>{TITLE + ' | Page 5'}</title>
      <HeaderMenuNavigation />

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <h5 className="title is-5">Page 5 Example : Server data, the TanStack Query way!</h5>
        </div>
      </div>

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <p style={{ textAlign: 'left' }}>
            This template is a fully self-contained frontend app — it runs without any server. But the moment a server
            comes into play, <strong>TanStack Query</strong> is the blessed option for fetching, caching and
            synchronizing server data. The stores remain for your app's working/UI state; server state lives in the
            query cache.
            <br />
            This page demonstrates the pattern with a public JSON API: loading, error, and cached states all handled for
            you. If you are offline, you'll see the error state — the rest of the app keeps working regardless.
          </p>
        </div>
      </div>

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          {isPending && <progress className="progress is-small is-primary" max="100" />}

          {isError && (
            <div className="notification is-warning">
              Could not reach the server: {error instanceof Error ? error.message : 'Unknown error'}
              <br />
              <i>The app still runs fully serverless — this page just has nothing to show without a network.</i>
            </div>
          )}

          {data && (
            <div style={{ textAlign: 'left', width: '100%' }}>
              <button className="button is-small is-link" onClick={() => refetch()} disabled={isFetching}>
                {isFetching ? 'Refreshing...' : 'Refetch'}
              </button>
              {data.map(post => (
                <div className="card" key={post.id} style={{ marginTop: '0.75rem' }}>
                  <div className="card-content">
                    <p className="title is-6">{post.title}</p>
                    <p>{post.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
