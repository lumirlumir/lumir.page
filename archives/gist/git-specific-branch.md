GitHub에서 특정 브랜치만 클론하는 방법은 아래와 같은 명령어를 사용하면 됩니다:

```bash
git clone --branch <브랜치명> --single-branch <저장소_URL>
```

예시:

```bash
git clone --branch feature-branch --single-branch https://github.com/username/repository.git
```

이 명령어는 `feature-branch`라는 브랜치만 클론하여, 저장소 전체를 클론하지 않고 해당 브랜치만 가져옵니다.

### 옵션 설명:
- `--branch <브랜치명>`: 특정 브랜치를 지정합니다.
- `--single-branch`: 지정한 브랜치만 클론하고 다른 브랜치 정보는 무시합니다.

이 방법을 통해 네트워크 트래픽을 절약하고, 필요 없는 브랜치 데이터를 받지 않게 됩니다.