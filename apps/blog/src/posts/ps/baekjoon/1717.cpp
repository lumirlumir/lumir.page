#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

void DS_make_set(int p[], int u) { p[u] = u; }

int DS_find_set(int p[], int u) {  // Root Node를 찾음.
  if (u == p[u])
    return u;
  else
    return p[u] = DS_find_set(p, p[u]);
}

void DS_Union(int p[], int u, int v) { p[DS_find_set(p, v)] = DS_find_set(p, u); }

void print_test(int p[], int n) {  // Test
  for (int i = 0; i <= n; i++) printf("%d ", p[i]);
  printf("\n");
}

int main(int argc, char* argv[]) {
  int n, m = 0;
  scanf("%d %d", &n, &m);

  int* p = (int*)calloc(n + 1, sizeof(int));
  for (int i = 0; i <= n; i++) DS_make_set(p, i);

  // print_test(p, n); //Test

  for (int i = 0; i < m; i++) {
    int op, buf1, buf2 = 0;
    scanf("%d %d %d", &op, &buf1, &buf2);

    if (op == 0) DS_Union(p, buf1, buf2);
    if (op == 1)
      printf("%s\n", DS_find_set(p, buf1) == DS_find_set(p, buf2) ? "YES" : "NO");

    // print_test(p, n);
  }

  free(p);

  return 0;
}
