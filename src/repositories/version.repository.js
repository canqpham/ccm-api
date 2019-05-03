import Version from '../models/vesion.model';

class VersionRepository {
  constructor() { }

  create = async (data) => {
    const version = await Version.create(data);
    return version;
  }

  getVersion = async (data) => {
    const version = await Version.findOne(data)
    return version
  }

  update = async (id, data) => {
      await Version.findByIdAndUpdate(id, data)
      const version = await Version.findById(id)
      return version
  }

  getListVersionByParams = async (data) => {
    const versions = await Version.find(data)
    return versions
  }

  getListAll = async () => {
      const versions = await Version.find()
      return versions
  }

  remove = async id => {
    const version = await Version.findByIdAndRemove(id)
    return version
  }
}

export default VersionRepository;