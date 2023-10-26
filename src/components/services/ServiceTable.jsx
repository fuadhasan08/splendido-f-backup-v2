import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FilteredTable from '../ui/FilteredTable';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';

const ServiceTable = () => {
  const { userRole } = useUser();
  const [serviceList, setServices] = useState([]);
  const [open, setOpen] = useState(false);

  const [editData, setEditData] = useState({
    title: '',
    price: 0,
    category: '',
  });

  const fetchData = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_HOST}/api/v1/services/`
    );
    setServices(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleDelete = async (id) => {
    const conf = confirm('Are you sure?');
    if (conf) {
      await axios.post(`${import.meta.env.VITE_HOST}/api/v1/services/delete`, {
        id,
      });
      fetchData();
      toast(`Service with id:${id} Deleted`);
    } else {
      toast(`Operation cancelled`);
    }
  };

  const onEdit = async (id) => {
    setOpen(true);
    let singleService = serviceList.filter((item) => item.id == id);
    setEditData(...singleService);
  };

  const handleEdit = async () => {
    const { id, title, price } = editData;

    const conf = confirm('Are you sure?');

    if (conf) {
      await axios.post(`${import.meta.env.VITE_HOST}/api/v1/services/update`, {
        id,
        title,
        price,
      });
      fetchData();
      setOpen(false);
      toast(`${title} Edited Succesfully`);
    } else {
      setOpen(false);
      toast(`Operation cancelled`);
    }
  };

  const columns = (userRole.role == "admin") ? [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },
    {
      accessorKey: '',
      header: 'Edit',
      cell: ({ row }) => {
        const id = parseFloat(row.getValue('id'));

        return (
          <AiFillEdit
            onClick={() => onEdit(id)}
            className='cursor-pointer text-pink-600'
          />
        );
      },
    },
    {
      accessorKey: '',
      header: 'Delete',
      cell: ({ row }) => {
        const id = parseFloat(row.getValue('id'));

        return (
          <AiFillDelete
            onClick={() => handleDelete(id)}
            className='cursor-pointer text-pink-600'
          />
        );
      },
    },
  ] :  [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },
  ];

  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <form>
            <div>
              <div className='mb-2'>
                <Label htmlFor={`title`} className='inline-block'>
                  Service Title
                </Label>

                <Input
                  name={`title`}
                  id={`title`}
                  type='text'
                  placeholder='Enter Title'
                  onChange={handleInputChange}
                  isrequired={true}
                  defaultValue={editData.title}
                />
              </div>
              <div className='mb-2'>
                <Label htmlFor={`price`}>Price</Label>
                <Input
                  name={`price`}
                  id={`price`}
                  type='number'
                  placeholder='Enter Price'
                  onChange={handleInputChange}
                  isrequired={true}
                  defaultValue={editData.price}
                />
              </div>
              <div className='mb-2'>
                <Label htmlFor='category'>Category</Label>
                <Input
                  name='category'
                  id='category'
                  type='text'
                  placeholder='Enter Category'
                  onChange={handleInputChange}
                  isrequired={true}
                  defaultValue={editData.category}
                />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button
              onClick={() => {
                handleEdit();
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <FilteredTable columns={columns} data={serviceList} />
    </>
  );
};

export default ServiceTable;
