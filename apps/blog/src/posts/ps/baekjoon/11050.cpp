#pragma warning(disable : 4996)
#include <stdio.h>

long long memo[1001][1002];

long long bc(int n, int k) {  // nCk 구하기.
  if (k == 0 || k == n)
    return 1;
  else if (memo[n][k] != 0)
    return memo[n][k];
  else
    return memo[n][k] = (bc(n - 1, k - 1) + bc(n - 1, k)) % 10007;
}

int main(void) {
  int n, k;
  scanf("%d %d", &n, &k);

  printf("%lld", bc(n, k) % 100);

  return 0;
}

/* 11051? ??? ??. */
